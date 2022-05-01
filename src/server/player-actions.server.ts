import { Players, ReplicatedStorage } from "@rbxts/services";
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

Remotes.Server.OnFunction("SubmitClick", (player: Player): number => {
  const data = PlayerDataMap.get(player);

  if (!data) return -1;

  const clicks = math.min(data.clicks + data.equipped[1].power, data.equipped[0].storage);

  PlayerDataMap.set(player, {
    money: data.money,
    clicks: clicks,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  });

  return clicks;
});

Remotes.Server.OnFunction(
  "SubmitSell",
  (player: Player) =>
    new Promise((resolve, reject) => {
      const data = PlayerDataMap.get(player);

      if (!data) return reject("Couldn't find player in PlayerDataMap!");

      const newMoney = data.money + data.clicks;

      PlayerDataMap.set(player, {
        money: newMoney,
        clicks: 0,
        bags: data.bags,
        clickers: data.clickers,
        equipped: data.equipped,
      });

      return resolve(newMoney);
    })
);
