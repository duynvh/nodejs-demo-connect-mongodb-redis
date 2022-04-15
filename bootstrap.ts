import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

import * as bodyParser from 'body-parser';

import TYPES from './constant/types';
import CONFIGS from './constant/configs';

import { UserService } from './service/user';
import { TimeService } from './service/time';

import './controller/user';
import './controller/time';

// import './libs/redis-cluster';

let container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<TimeService>(TYPES.TimeService).to(TimeService);

let server = new InversifyExpressServer(container);

mongoose.connect(
  CONFIGS.MONGODB_URI,
  {
    directConnection: true,
  },
  (err: Error) => {
    if (err) {
      console.log(err);
      console.log('not connect to the database');
    } else {
      console.log('Suucessfully connected to MongoDB');
    }
  }
);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000');
