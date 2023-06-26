import crypto from "node:crypto";

import { Receipt } from "../models";


export const generateIdForReceipt = (): string => {
  return crypto.randomUUID();
}

// These rules collectively define how many points should be awarded to a receipt.

// One point for every alphanumeric character in the retailer name.
// 50 points if the total is a round dollar amount with no cents.
// 25 points if the total is a multiple of 0.25.
// 5 points for every two items on the receipt.
// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
// 6 points if the day in the purchase date is odd.
// 10 points if the time of purchase is after 2:00pm and before 4:00pm.

export const calculatePoints = (receipt: Receipt): number => {
  let points: number = 0;
  console.log(`starting points: ${points}`);

  // One point for every alphanumeric character in the retailer name.
  console.log(`receipt.retailer.length; : ${receipt.retailer.length}`);
  points += receipt.retailer.length; // TODO: This does not remove non-alpha numeric characters yet

  // 50 points if the total is a round dollar amount with no cents.
  const itemTotalPrice = receipt.items.reduce((acc, item) => acc += parseFloat(item.price), 0)
  console.log(`itemTotalPrice : ${itemTotalPrice}`);

  console.log(`itemTotalPrice % 100: ${itemTotalPrice % 100}`);
  points += itemTotalPrice % 100 === 0 ? 50 : 0;
  
  // 25 points if the total is a multiple of 0.25.
  console.log(`itemTotalPrice % .25 : ${itemTotalPrice % .25}`);
  points += itemTotalPrice % .25 === 0 ? 25 : 0; 
  
  // 5 points for every two items on the receipt.
  console.log(`(receipt.items.length / 2) : ${(receipt.items.length / 2)}`);
  points += (receipt.items.length / 2) * 5;
  
  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  for (const item of receipt.items) {
    console.log(item.shortDescription.trim().length);
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(parseInt(item.price) * 0.2);
    }
  }
  
  // 6 points if the day in the purchase date is odd.
  console.log(`new Date(receipt.purchaseDate).getDay(): ${new Date(receipt.purchaseDate).getDay()}`);
  points += new Date(receipt.purchaseDate).getDay() % 2 === 1 ? 6 : 0
  
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  console.log(`receipt.purchaseTime: ${receipt.purchaseTime}`);
  points += (receipt.purchaseTime > '14:00' && receipt.purchaseTime < '16:00') ? 10 : 0;

  console.log(`totalPoints: ${points}`);
  return points;
}

// const calculateRetailerNamePoints;