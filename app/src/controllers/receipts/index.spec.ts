import test, { describe, it } from 'node:test';

const BASE_URL = 'localhost:3000';

let receipt = {
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}

describe('Receipt Controller', () => {
  describe('processReceipt function', () => {
    it('should return 400 if the receipt is not provided', async () => {
      const request = await fetch(`${BASE_URL}/receipts/process`, {
        method: 'POST',
        body: JSON.stringify({})
      })

      const response = await request.json();

      console.log(response);
    });

    it('should return 200 if the receipt provided is valid', async () => {
      const request = await fetch(`${BASE_URL}/receipts/process`, {
        method: 'POST',
        body: JSON.stringify(receipt)
      })

      console.log(request);

      const response = await request.json();

      console.log(response);
    });
  })
  
})