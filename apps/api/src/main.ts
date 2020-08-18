import * as express from 'express';
import getPeople from './app/getPeople';
import getPeoples from './app/getPeoples';
import getPhotos from './app/getPhotos';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/people', getPeople);
app.get('/peoples', getPeoples);
app.get('/photos', getPhotos);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
