import { Controller } from 'egg';

export default class TerminalController extends Controller {
  public async login() {
    const { ctx } = this;
    const { no, password } = ctx.request.body;
    if (!no || !password) ctx.throw(400);

    const one = await ctx.model.User.findOne({ no, password })

    if (one)
      ctx.success(one.toJSON());
    else
      ctx.throw(400);
  }

  async startProcess() {
    const { bizqid } = this.ctx.request.body;
    if (!bizqid) this.ctx.throw();
    const { Bizzqueue, Nodebizz } = this.ctx.model;
    const docNodebizz = await Nodebizz.findOne({ bizqid, status: 1 });
    const docQueue = await Bizzqueue.findById(bizqid);
    if (!docNodebizz) this.ctx.throw('未找到该业务，无法处理(bizqid:' + bizqid + ').')
    docNodebizz.status = 2;
    await docNodebizz.save();
    this.app.io.of('/').to(docNodebizz.nodeid).emit('terminal_startprocess', (docQueue.toJSON()));
    this.ctx.success();
  }

  async stopProcess() {
    const { bizqid } = this.ctx.request.body;
    if (!bizqid) this.ctx.throw();
    const { Bizzqueue, Nodebizz } = this.ctx.model;
    const docNodebizz = await Nodebizz.findOne({ bizqid, status: 2 });
    if (!docNodebizz) this.ctx.throw('未找到该业务，无法处理(bizqid:' + bizqid + ').')
    await Nodebizz.findOneAndUpdate({ bizqid }, { $set: { status: 0 } }, { new: true });
    try {
      //const docQueue = await Bizzqueue.findById(bizqid);
      this.app.io.of('/').to(docNodebizz.nodeid).emit('terminal_stopprocess',);
    } catch (err) {

    }

    this.ctx.success();
  }


  // public async put() {
  //   const newOne = await this.ctx.model.User.create({ no: '001', name: 'Leo', password: '123123' });
  //   this.ctx.success(newOne)
  // }

}