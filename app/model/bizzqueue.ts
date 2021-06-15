import { Application } from "egg";
import { Schema, Types } from 'mongoose'
export default (app: Application) => {

    const conn = app.mongoose;
    const schema = new Schema({
        // 业务号
        // seq: { type: Number, default: 0 },
        // 名称
        bizid: String,
        bizno: String,
        bizName: String,
        areaid: String,
        areaName: String,
        nodeid: String,
        nodeName: String,
        clientID: String,
        clientName: String,
        // 1：未处理 0：已处理
        status: { type: Number, default: 1 }
    },
        {
            // 显示 id
            id: true,
            // 隐藏版本号
            versionKey: false,
            // 自动时间戳
            timestamps: {
                createdAt: 'create_at',
                updatedAt: 'updated_at'
            }
        });

    schema.virtual('id').get(function (this: any) {
        return this._id.toHexString();
    });

    schema.method('toJSON', function (this: any) {
        const { _id, ...rest } = this.toObject({ virtuals: true, versionKey: false, getters: true });
        return rest;
    });

    // schema.pre('save', function (this: any, next) {
    //     let doc: any = this;
    //     conn.models['Counter'].findOneAndUpdate({ name: 'queue' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (err, counter) {
    //         if (err) return next(err);
    //         doc.seq = counter.seq;
    //         next();
    //     })
    // })

    return conn.model('Bizzqueue', schema)
}