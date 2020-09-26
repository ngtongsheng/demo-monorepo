/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { getChannels } from './app/channels';

const app = express();
const port = process.env.port || 3333;

const accessControl = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

const onConnect = () => {
  console.log(`Listening at http://localhost:${port}/api`);
};

app.use(accessControl).use(express.json()).post('/channel', getChannels);

const server = app.listen(port, onConnect);
server.on('error', console.error);
