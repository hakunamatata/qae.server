import { Application } from "egg";
import { Schema } from 'mongoose'
export default (app: Application) => {

    const conn = app.mongoose;
    const schema = new Schema({
        // 名称
        name: { type: String, required: true },
        // 序列
        seq: { type: Number, default: 0 }
    });


    return conn.model('Counter', schema)
}