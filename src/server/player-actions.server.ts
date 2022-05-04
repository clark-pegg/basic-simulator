import { BadgeService, Players } from "@rbxts/services";
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

Remotes.Server.OnFunction("SubmitClick", (player: Player) => {
  const data = PlayerDataMap.get(player);

  if (!data) error("Couldn't find data!");

  const newClicks = math.min(
    data.clicks + data.equipped[1].power,
    data.equipped[0].storage
  );

  PlayerDataMap.set(player, {
    money: data.money,
    clicks: newClicks,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  });

  return newClicks;
});

Remotes.Server.OnFunction("SubmitSell", (player: Player) => {
  const data = PlayerDataMap.get(player);

  if (!data) error("Couldn't find data!");

  const newMoney = data.money + data.clicks;

  PlayerDataMap.set(player, {
    money: newMoney,
    clicks: 0,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  });

  return newMoney;
});
