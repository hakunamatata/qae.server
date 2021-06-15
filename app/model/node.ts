import { Application } from "egg";
import { Schema, Types } from 'mongoose'
export default (app: Application) => {

    const conn = app.mongoose;
    const schema = new Schema({
        // 名称
        bizName: String,
        number: Number,
        area: Types.ObjectId,
        bizz: Types.ObjectId
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

    return conn.model('Node', schema)
}