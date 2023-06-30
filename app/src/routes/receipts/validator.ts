import { object, string, array, date } from 'yup';
import { Request, Response } from 'express';
import { parse, isDate } from 'date-fns';

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

const parseTimeString = (value: string, originalValue: string) => {
  const parsedTime = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'HH:mm', new Date());

  return parsedTime;
}

export const receiptSchema = object({
  body: object({
    retailer: string().required().strict(),
    purchaseDate: date().required().transform(parseDateString),
    purchaseTime: date().required().transform(parseTimeString),
    items: array(
      object({
        shortDescription: string().required().strict(),
        price: string().required().strict(),
      })
    ),
    total: string().required().strict(),
  }),
});

export const validate = (schema: any) => async (req: Request, res: Response, next: any) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (err: any) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};


