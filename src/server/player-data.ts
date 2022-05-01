export type Bag = Readonly<{ price: number; storage: number }>;

export const BagMap: Map<string, Bag> = new Map<string, Bag>([
  ["basic", { price: 0, storage: 10 }],
  ["wooden", { price: 100, storage: 100 }],
  ["stone", { price: 1_000, storage: 1_000 }],
  ["iron", { price: 10_000, storage: 10_000 }],
  ["diamond", { price: 100_000, storage: 100_000 }],
]);

export type Clicker = Readonly<{ price: number; power: number }>;

export const ClickerMap: Map<string, Clicker> = new Map<string, Clicker>([
  ["basic", { price: 0, power: 1 }],
  ["wooden", { price: 100, power: 5 }],
  ["stone", { price: 1_000, power: 25 }],
  ["iron", { price: 10_000, power: 125 }],
  ["diamond", { price: 100_000, power: 625 }],
]);

export type PlayerData = Readonly<{
  money: number;
  clicks: number;
  bags: ReadonlyArray<Bag>;
  clickers: ReadonlyArray<Clicker>;
  equipped: [Bag, Clicker];
}>;

export const PlayerDataMap: Map<Player, PlayerData> = new Map<Player, PlayerData>();
