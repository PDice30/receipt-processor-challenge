import { Request, Response } from "express";

import { ProcessedReceipt, Receipt } from "../models";
import { calculatePoints, generateIdForReceipt } from "../services";

let processedReceipts: ProcessedReceipt[] = [];

/**
 * @param req : Express Request object
 * @param res : Express Response object
 * @returns : an object containing a key of "id" and a value of a GUID assigned to the receipt transaction.
 * The function will also pass the receipt to the service which will correctly assign point values and store the receipts in memory.
 */
export const processReceipt = (req: Request, res: Response): Object => {
  // TODO: Will also need to check if receipt is invalid, not just missing
  if (!req.body || Object.keys(req.body).length === 0) { 
    res.status(400).send('Receipt is missing.');
    return {};
  }
  // TODO: Validate input types from body
  const receipt: Receipt = req.body;
  console.log(receipt);

  // Generate ID
  const id = generateIdForReceipt();
  // Calculate Points
  const points = calculatePoints(receipt);

  const processedReceipt: ProcessedReceipt = {
    id,
    receipt,
    points,
  }

  processedReceipts.push(processedReceipt);

  const response = { 'id': id };
  res.status(200).send(response);

  return {};
}

/**
 * @param req : Express Request object
 * @param res : Express Response object
 * @returns : an object containing a key of "points" and a value of type integer with the amount of points assigned to this receipt.
 */
export const getPoints = (req: Request, res: Response): Object => {
  const { id } = req.params
  // res.status(200).send(`Receipt GET points from id ${id}`);

  const foundReceipt = processedReceipts.find(processedReceipt => processedReceipt.id === id);
  if (foundReceipt) {
    const response = { 'points': foundReceipt.points };
    res.status(200).send(response);
    // TODO: Needed response return?
    return response;
  }

  res.status(404).send('No receipt found for that id');

  return {};
}