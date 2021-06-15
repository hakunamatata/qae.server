import { Controller } from 'egg'

export default class TerminalController extends Controller {
    async register() {
        const { app, socket, args, query } = this.ctx;
        const nsp = app.io.of('/');
        const { room } = query;
        const { area, node, user } = args[0];
        try {
            const one = await this.ctx.model.Node.findById(node);
            if (!one) throw 'node not found';
            // 终端加入 room, area, node
            socket.join([room, area, node]);
            // 广播用户上线了
            if (user) nsp.to(node).emit('terminal_online', socket.id, user);
            // 回复节点信息
            socket.emit('terminal_register', socket.id);

        } catch (err) {
            this.ctx.throw(err);
        }

    }
}