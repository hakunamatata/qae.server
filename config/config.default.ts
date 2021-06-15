import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { uid } from 'uid/secure';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1623416175830_7855';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    //domainWhiteList:[]
  }

  config.cors = {
    origin: "*",
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/qae',
      options: {
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    }
  }

  // config.redis = {
  //   client: {
  //     host: 'artibition.cn',
  //     port: 6379,
  //     password: 'yP6#H3aw4N7g7*gw',
  //     db: 0,
  //   }
  // }

  config.io = {
    init: {},
    generateId: (request) => {
      // Something like UUID.
      return uid(32);
    },
    redis: {
      host: 'artibition.cn',
      port: 6379,
      auth_pass: 'yP6#H3aw4N7g7*gw',
      db: 0,
    },
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packageMiddleware: []
      }
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
}