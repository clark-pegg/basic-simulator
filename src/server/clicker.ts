export type Clicker = Readonly<{ price: number; power: number }>;

export const NewClicker = (price: number, power: number): Clicker => {
  return { price: price, power: power };
};

export const ClickerMap = new Map<string, Clicker>();
