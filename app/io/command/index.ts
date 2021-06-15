import { Context } from "egg"

export const syncDate = (ctx: Context, args: any = {}) => {
    const { socket } = ctx;
    const formatted = ctx?.formatDate(Date.now()).split(' ');
    socket.emit('syncDate', { date: formatted[0], time: formatted[1] })
}