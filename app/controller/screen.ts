import { Controller } from 'egg';

export default class ScreenController extends Controller {
    async getareas() {
        console.log('debug areas');
        const docs = await this.ctx.model.Area.find();
        this.ctx.success(docs.map(p => p.toJSON()));
    }

    async getnodes() {
        const { area } = this.ctx.query;
        const docs = await this.ctx.model.Node.find({ area });
        this.ctx.success(docs.map(p => p.toJSON()));
    }
}