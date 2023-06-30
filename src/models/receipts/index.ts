export type ProcessedReceipt = {
  id: string;
  receipt: Receipt;
  points: number;
};

export type Receipt = {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Item[];
  total: string;
};

export type Item = {
  shortDescription: string;
  price: string;
};
