export type Bag = Readonly<{ price: number; storage: number }>;

const newBag = (price: number, storage: number): Bag => {
  return { price: price, storage: storage };
};

export const bagList: Readonly<{ [key: string]: Bag }> = {
  basic: newBag(0, 10),
  wooden: newBag(100, 100),
  stone: newBag(1_000, 1_000),
  iron: newBag(10_000, 10_000),
  diamond: newBag(100_000, 100_000),
};
