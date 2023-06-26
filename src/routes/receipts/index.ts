import { Router } from 'express';
import { getPoints, processReceipt } from '../../controllers/receiptController';

export const receiptsRouter = Router();

receiptsRouter.post('/process', processReceipt);
receiptsRouter.get('/:id/points', getPoints);