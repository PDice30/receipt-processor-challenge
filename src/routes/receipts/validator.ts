import { object, string, array } from 'yup';
import { Request, Response } from 'express';

export const receiptSchema = object({
  body: object({
    retailer: string().required().strict(),
    purchaseDate: string().required().strict(),
    purchaseTime: string().required().strict(),
    items: array(
      object({
        shortDescription: string().required().strict(),
        price: string().required().strict(),
      })
    ),
    total: string().required().strict(),
  }),
});

export const validate =
  (schema: any) => async (req: Request, res: Response, next: any) => {
    try {
      await schema.validate({
        body: req.body,
      });
      return next();
    } catch (err: any) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };
