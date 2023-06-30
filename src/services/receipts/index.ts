import crypto from 'node:crypto';

import { Receipt } from '../../models/receipts';

import { logger } from '../..';

export const generateIdForReceipt = (): string => {
  return crypto.randomUUID();
};

export const calculatePoints = (receipt: Receipt): number => {
  let points: number = 0;

  // One point for every alphanumeric character in the retailer name.
  const nameLength = receipt.retailer.replace(/[^A-Z]/gi, '').length;
  points += nameLength;
  logger.info(`${nameLength} points - retailer name has ${nameLength} characters`);

  const itemTotalPrice = +receipt.total;

  // 50 points if the total is a round dollar amount with no cents.
  if (itemTotalPrice % 1 === 0) {
    points += 50;
    logger.info('50 points - total is a round dollar amount');
  }

  // 25 points if the total is a multiple of 0.25.
  if (itemTotalPrice % 0.25 === 0) {
    points += 25;
    logger.info('25 points - total is a multiple of 0.25');
  }

  // 5 points for every two items on the receipt.
  points += Math.floor(receipt.items.length / 2) * 5;
  logger.info(`${Math.floor(receipt.items.length / 2) * 5} points - ${Math.floor(receipt.items.length / 2)} pairs @ 5 points each`);

  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  for (const item of receipt.items) {
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(parseInt(item.price) * 0.2);
      logger.info(`${Math.ceil(parseInt(item.price) * 0.2)} points - ${item.shortDescription.trim()} is a multiple of 3.`);
    }
  }

  // 6 points if the day in the purchase date is odd.
  if (new Date(receipt.purchaseDate).getDay() % 2 === 1) {
    points += 6;
    logger.info('6 points - purchase day is odd');
  }

  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  if (receipt.purchaseTime > '14:00' && receipt.purchaseTime < '16:00') {
    points += 10;
    logger.info(`10 points - ${receipt.purchaseTime} is between 2:00pm and 4:00pm`)
  }

  logger.info(`Total Points: ${points}`);

  return points;
};
