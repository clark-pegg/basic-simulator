import { Bag } from "shared/bag";
import { Clicker } from "shared/clicker";

import { bagList } from "shared/bag";
import { clickerList } from "shared/clicker";

export type PlayerData = Readonly<{
  money: number;
  clicks: number;
  bags: ReadonlyArray<Bag>;
  clickers: ReadonlyArray<Clicker>;
  equipped: [Clicker, Bag];
}>;

export const newPlayerData = (): PlayerData => {
  return {
    money: 0,
    clicks: 0,
    bags: [bagList.basic],
    clickers: [clickerList.basic],
    equipped: [clickerList.basic, bagList.basic],
  };
};

export const increaseClicks = (
  data: PlayerData,
  clicks: number
): PlayerData => {
  return {
    money: data.money,
    clicks: data.clicks + clicks,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  };
};

export const sellClicks = (data: PlayerData): PlayerData => {
  return {
    money: data.money + data.clicks,
    clicks: 0,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  };
};

export const purchaseBag = (
  data: PlayerData,
  price: number,
  bag: Bag
): PlayerData => {
  return {
    money: data.money - price,
    clicks: data.clicks,
    bags: [...data.bags, bag],
    clickers: data.clickers,
    equipped: data.equipped,
  };
};

export const purchaseClicker = (
  data: PlayerData,
  price: number,
  clicker: Clicker
): PlayerData => {
  return {
    money: data.money - price,
    clicks: data.clicks,
    bags: data.bags,
    clickers: [...data.clickers, clicker],
    equipped: data.equipped,
  };
};

export const equipClicker = (data: PlayerData, index: number): PlayerData => {
  return {
    money: data.money,
    clicks: data.clicks,
    bags: data.bags,
    clickers: data.clickers,
    equipped: [data.clickers[index], data.equipped[1]],
  };
};

export const equipBag = (data: PlayerData, index: number): PlayerData => {
  return {
    money: data.money,
    clicks: data.clicks,
    bags: data.bags,
    clickers: data.clickers,
    equipped: [data.equipped[0], data.bags[index]],
  };
};
