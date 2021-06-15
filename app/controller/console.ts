import { Controller } from 'egg';

export default class ConsoleController extends Controller {
    async getbizzes() {
        const { parent } = this.ctx.query;

        const list = await this.ctx.model.Bizz.find({ parent: parent ? parent : null });
        try {
            this.ctx.success(list.map(p => p.toJSON()));
        } catch (err) {
            this.ctx.throw(err)
        }
    }

    async putBizzQueue() {
        const { bizid, clientID, clientName } = this.ctx.request.body;
        const { Bizz, Bizzqueue, Area, Node, Client, Counter } = this.ctx.model;

        try {
            const docBiz = await Bizz.findById(bizid);
            if (!docBiz) this.ctx.throw('该业务不可办理');

            const docsNode = await Node.find({ bizz: bizid });
            const nodes = docsNode.map(p => p.toJSON());

            if (nodes.length == 0) this.ctx.throw('该业务没有窗口可办理');

            let node;
            if (nodes.length == 1) {
                node = nodes[0];
            } else {
                // 多个窗口可以办理该业务，选择队列人数最少的一个
                for (let i = 0; i < nodes.length; i++)
                    nodes[i].queueLength = await Bizzqueue.find({ nodeid: nodes[i].id }).countDocuments();

                nodes.sort((l, r) => {
                    if (l.queueLength > r.queueLength)
                        return 1
                    else
                        return -1;
                });
                node = nodes[0]
            }

            const docArea = await Area.findById(node.area);
            if (!docArea) this.ctx.throw('该业务窗口或者网点配置不正确, 请联系管理员.');

            const { name: bizName } = docBiz.toJSON();
            const { id: nodeid, number } = node;
            const { id: areaid, name: areaName, abbr: areaAbbr } = docArea.toJSON();
            const nodeName = number + '号窗口'
            const { seq } = await Counter.findOneAndUpdate({ name: 'queue' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            const bizno = `${areaAbbr}${number}${seq.toString().padStart(3, '0')}`
            console.log({
                bizno,
                bizid, clientID, clientName,
                bizName,
                areaid,
                areaName,
                nodeid,
                nodeName,
            });

            await Client.updateOne({ idcard: clientID, name: clientName }, { $set: { idcard: clientID, name: clientName } }, { upsert: true });
            const latest = await Bizzqueue.create({
                bizno,
                bizid,
                clientID,
                clientName,
                bizName,
                areaid,
                areaName,
                nodeid,
                nodeName,
            });
            this.ctx.success(latest.toJSON());
        } catch (err) {
            this.ctx.throw(err)
        }

    }

    async getBizzQueueOfNode() {
        const { nid } = this.ctx.query;
        if (!nid) {
            this.ctx.success([]);
            return;
        }

        const list = await this.ctx.model.Bizzqueue.find({
            nodeid: nid,
            status: 1
        });
        this.ctx.success(list.map(p => p.toJSON()));
    }

    // 获取当前窗口下一个待办理业务
    async popBizzQueue() {
        // 
        const { nid } = this.ctx.query

        try {
            if (!nid) throw '未知窗口'
            const { Bizzqueue, Nodebizz } = this.ctx.model
            const docPop = await Bizzqueue.findOne({ status: 1, nodeid: nid }).sort({ create_at: 1 }).limit(1);
            if (!docPop) {
                this.ctx.success();
                return;
            }
            const res = docPop.toJSON();
            const { areaid, nodeid, bizid } = res;
            docPop.status = 0;
            await docPop.save();
            await Nodebizz.create({ areaid, nodeid, bizqid: res.id });
            this.app.io.of('/').to(nid).emit('update_queue')
            // 控制台广播当前办理队列的第一条信息
            this.app.io.of('/').to(nid).emit('console_broadpopqueue', res);
            this.ctx.success(res);
        }
        catch (err) {
            this.ctx.throw(err);
        }
    }

}