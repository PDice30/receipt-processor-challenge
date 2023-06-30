import { Router } from 'express';
import { getPoints, processReceipt } from '../../controllers/receipts';
import { receiptSchema, validate } from './validator';

export const receiptsRouter = Router();

receiptsRouter.post('/process', validate(receiptSchema), processReceipt);
receiptsRouter.get('/:id/points', getPoints);
