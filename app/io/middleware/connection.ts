import { Context } from 'egg'
const default_room = 'public'
export default () => {
    return async (ctx: Context, next) => {
        const { socket } = ctx;
        ctx.socket.join(default_room);
        await next();
        socket.disconnect();
    };
}