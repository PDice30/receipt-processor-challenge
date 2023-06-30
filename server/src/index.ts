import express, { Express, json } from 'express';

import { router } from './routes';

const app: Express = express();
const port = 3000;

app.use(json());

app.use(router);

app.listen(port, () => {
  console.log(`[Server]: Running at https://localhost:${port}`);
});
