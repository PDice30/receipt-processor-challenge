import { Request, Response } from 'express';

import { ProcessedReceipt, Receipt } from '../../models';
import { calculatePoints, generateIdForReceipt } from '../../services';

let processedReceipts: ProcessedReceipt[] = [];

/**
 * @param req : Express Request object
 * @param res : Express Response object
 */
export const processReceipt = (req: Request, res: Response) => {
  const receipt: Receipt = req.body;

  // Generate ID
  const id = generateIdForReceipt();
  // Calculate Points
  const points = calculatePoints(receipt);

  const processedReceipt: ProcessedReceipt = {
    id,
    receipt,
    points,
  };

  processedReceipts.push(processedReceipt);

  const response = { id: id };
  res.status(200).send(response);

  return;
};

/**
 * @param req : Express Request object
 * @param res : Express Response object
 */
export const getPoints = (req: Request, res: Response) => {
  const { id } = req.params;

  const foundReceipt = processedReceipts.find((processedReceipt) => processedReceipt.id === id);

  if (foundReceipt) {
    const response = { points: foundReceipt.points };
    res.status(200).send(response);
    return;
  }

  res.status(404).send('No receipt found for that id');

  return;
};
