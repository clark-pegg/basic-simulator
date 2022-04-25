export type Clicker = Readonly<{ price: number; power: number }>;

const newClicker = (price: number, power: number): Clicker => {
  return { price: price, power: power };
};

export const clickerList: Readonly<{ [key: string]: Clicker }> = {
  basic: newClicker(0, 2),
  wooden: newClicker(100, 4),
  stone: newClicker(1_000, 8),
  iron: newClicker(10_000, 16),
  diamond: newClicker(100_000, 32),
};
