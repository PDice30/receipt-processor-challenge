import { Request, Response, Router } from 'express';
import { Receipt } from '../../models';

export const receiptsRouter = Router();

receiptsRouter.post('/process', (req: Request, res: Response) => {
  // TODO: Will also need to check if receipt is invalid, not just missing
  if (!req.body || Object.keys(req.body).length === 0) { 
    res.status(400).send('Receipt is missing.');
    return;
  }
  // TODO: Validate input types from body
  const receipt: Receipt = req.body;
  console.log(receipt);
  res.status(200).send('Receipt POST process');
});

receiptsRouter.get('/:id/points', (req: Request, res: Response) => {
  const { id } = req.params
  res.status(200).send(`Receipt GET points from id ${id}`);
});