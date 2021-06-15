// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArea from '../../../app/model/area';
import ExportBizz from '../../../app/model/bizz';
import ExportBizzqueue from '../../../app/model/bizzqueue';
import ExportClient from '../../../app/model/client';
import ExportCounter from '../../../app/model/counter';
import ExportNode from '../../../app/model/node';
import ExportNodebizz from '../../../app/model/nodebizz';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Area: ReturnType<typeof ExportArea>;
    Bizz: ReturnType<typeof ExportBizz>;
    Bizzqueue: ReturnType<typeof ExportBizzqueue>;
    Client: ReturnType<typeof ExportClient>;
    Counter: ReturnType<typeof ExportCounter>;
    Node: ReturnType<typeof ExportNode>;
    Nodebizz: ReturnType<typeof ExportNodebizz>;
    User: ReturnType<typeof ExportUser>;
  }
}
