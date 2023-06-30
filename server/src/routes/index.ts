import { Router } from 'express';

import { receiptsRouter } from './receipts';

export const router = Router();

router.use('/receipts', receiptsRouter);
