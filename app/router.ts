import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;
  const socket: any = io.controller;


  router.post('/terminal/login', controller.terminal.login);
  router.post('/terminal/process', controller.terminal.startProcess);
  router.delete('/terminal/process', controller.terminal.stopProcess);

  router.get('/screen/area', controller.screen.getareas);
  router.get('/screen/node', controller.screen.getnodes);

  router.get('/console/bizz', controller.console.getbizzes);
  router.put('/console/bizzqueue', controller.console.putBizzQueue);
  router.get('/console/bizzqueue', controller.console.getBizzQueueOfNode);
  router.post('/console/bizzqueue', controller.console.popBizzQueue);
  // router.put('/admin/bizz', controller.bizz.put)

  io.of('/').route('exchange', socket.nsp.exchange)

  // 控制台注册上线
  io.of('/').route('console_register', socket.console.register)
  io.of('/').route('console_pushBizzPool', socket.console.pushBizzPool)
  // 屏幕注册上线
  io.of('/').route('screen_register', socket.screen.register)
  // 终端注册上线
  io.of('/').route('terminal_register', socket.terminal.register)
};
