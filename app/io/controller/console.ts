import { Controller } from 'egg'

export default class ConsoleController extends Controller {
    async register() {
        const { app, socket, args, query } = this.ctx;
        //const nsp = app.io.of('/');
        const { room } = query;

        try {
            socket.join([room]);
            // 回复节点信息
            socket.emit('console_register', socket.id);
        } catch (err) {
            this.ctx.throw(err);
        }

    }

    // 控制台将任务推送至任务池
    async pushBizzPool() {
        const { app, socket, args } = this.ctx;
        const nsp = app.io.of('/');
        const { nodeid } = args[0];
        try {
            console.log('pushBizzPool:', nodeid);
            // 有新任务
            nsp.to(nodeid).emit('update_queue');
        } catch (err) {
            this.ctx.throw(err);
        }
    }
}