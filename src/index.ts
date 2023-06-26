import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import winston from 'winston';

import { router } from './routes';

const app: Express = express();
const port = 3000;

export const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'points.log' })]
});

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, ()=> {
  console.log(`[Server]: Running at https://localhost:${port}`);
});