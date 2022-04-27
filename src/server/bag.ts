export type Bag = Readonly<{ price: number; storage: number }>;

export const NewBag = (price: number, storage: number): Bag => {
  return { price: price, storage: storage };
};

export const BagMap = new Map<string, Bag>();
