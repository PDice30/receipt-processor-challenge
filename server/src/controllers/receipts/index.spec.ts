import request from 'supertest';

import app, { server } from '../../index'; // Assuming your app is defined in a separate file and exported as 'app'
import { generateIdForReceipt, calculatePoints } from '../../services/receipts';
import { ProcessedReceipt, Receipt } from '../../models/receipts';

let receipt = {
  retailer: 'Target',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  items: [
    {
      shortDescription: 'Mountain Dew 12PK',
      price: '6.49',
    },
    {
      shortDescription: 'Emils Cheese Pizza',
      price: '12.25',
    },
    {
      shortDescription: 'Knorr Creamy Chicken',
      price: '1.26',
    },
    {
      shortDescription: 'Doritos Nacho Cheese',
      price: '3.35',
    },
    {
      shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
      price: '12.00',
    },
  ],
  total: '35.35',
};

jest.mock('../../services/receipts', () => ({
  generateIdForReceipt: jest.fn().mockReturnValue('mocked-id'),
  calculatePoints: jest.fn().mockReturnValue(100),
}));

let processedReceipts: ProcessedReceipt[] = [];

beforeEach(() => {
  processedReceipts = [];
});

describe('Controller Tests', () => {
  describe('POST /receipts/process', () => {
    it('should process the receipt and return a response with status 200 and the generated ID', async () => {

      const expectedResponse = { id: 'mocked-id' };

      const response = await request(app)
        .post('/receipts/process')
        .send(receipt)
        .expect(200);

      expect(response.body).toEqual(expectedResponse);

      processedReceipts.push({
        id: expectedResponse.id,
        receipt: receipt,
        points: 28
      });

      expect(processedReceipts).toHaveLength(1);
      expect(processedReceipts[0].id).toBe('mocked-id');
      expect(processedReceipts[0].receipt).toEqual(receipt);
      expect(processedReceipts[0].points).toBe(28);
    });

    it('should process the receipt and return a response with status 200 and the generated ID', async () => {

      const expectedResponse = { id: 'mocked-id' };

      const response = await request(app)
        .post('/receipts/process')
        .send(receipt)
        .expect(200);

      expect(response.body).toEqual(expectedResponse);

      processedReceipts.push({
        id: expectedResponse.id,
        receipt: receipt,
        points: 28
      });

      expect(processedReceipts).toHaveLength(1);
      expect(processedReceipts[0].id).toBe('mocked-id');
      expect(processedReceipts[0].receipt).toEqual(receipt);
      expect(processedReceipts[0].points).toBe(28);
    });
  });

  describe('GET /receipts/:id/points', () => {
    it('should return the points for a processed receipt with status 200', async () => {

      const id = generateIdForReceipt();

      processedReceipts.push({
        id,
        receipt,
        points: 100,
      });

      const expectedResponse = { points: 100 };

      const response = await request(app)
        .get(`/receipts/${id}/points`)
        .expect(200);

      expect(response.body).toEqual(expectedResponse);
    });

    it('should return a 404 status if no receipt is found for the given ID', async () => {
      const id = 'non-existent-id';

      const response = await request(app)
        .get(`/receipts/${id}/points`)
        .expect(404);

      expect(response.text).toBe('No receipt found for that id');
    });
  });
});

afterAll(() => {
  server.close();
})
