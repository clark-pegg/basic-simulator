import { Players } from "@rbxts/services";
import { Bag, Clicker, PlayerData, PlayerDataMap } from "server/player-data";
import Remotes from "shared/remotes";

Players.PlayerAdded.Connect((player: Player) => {
  PlayerDataMap.set(player, {
    money: 0,
    clicks: 0,
    bags: new Array<Bag>(),
    clickers: new Array<Clicker>(),
    equipped: [
      { price: 0, storage: 10 },
      { price: 0, power: 1 },
    ],
  });
});
