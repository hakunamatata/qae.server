import { Context } from 'egg';
import * as moment from 'moment';
moment.locale('zh-cn');
const parseMsg = (action, payload = {}, metadata = {}) => {
    const meta = Object.assign({}, {
        timestamp: Date.now(),
    }, metadata);

    return {
        meta,
        data: {
            action,
            payload,
        },
    };
}


const formatDate = (date: Date) => {
    return moment(date).format('llll');
}

function success(this: Context, data: any = '') {
    this.body = data;
    this.status = 200;
}

export {
    parseMsg,
    formatDate,
    success
}