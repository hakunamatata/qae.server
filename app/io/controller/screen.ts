import { Controller } from 'egg'

export default class ScreenController extends Controller {
    async register() {
        const { app, socket, args, query } = this.ctx;
        const nsp = app.io.of('/');
        const { room } = query;
        const { area, node } = args[0];

        try {
            const one = await this.ctx.model.Node.findById(node);
            if (!one) throw 'node not found';
            // 屏幕加入 room, area, node
            socket.join([room, area, node]);
            // 广播屏幕上线了
            nsp.to(node).emit('screen_online', socket.id);
            // 回复节点信息
            socket.emit('screen_register', socket.id, one.toJSON());
        } catch (err) {
            this.ctx.throw(err);
        }

    }
}