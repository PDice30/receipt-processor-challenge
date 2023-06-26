import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { router } from './routes';

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, ()=> {
  console.log(`[Server]: I TEST am running at https://localhost:${port}`);
});