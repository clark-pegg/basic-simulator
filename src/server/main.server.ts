import { Players } from "@rbxts/services";
import { Bag, NewBag, BagMap } from "server/bag";
import { Clicker, NewClicker, ClickerMap } from "server/clicker";
import { PlayerData, NewPlayerData, PlayerDataMap } from "server/player-data";

BagMap.set("wooden", NewBag(100, 100))
  .set("stone", NewBag(1000, 1000))
  .set("iron", NewBag(10_000, 10_000))
  .set("diamond", NewBag(100_000, 100_000));
ClickerMap.set("wooden", NewClicker(100, 4))
  .set("stone", NewClicker(1000, 8))
  .set("iron", NewClicker(10_000, 16))
  .set("diamond", NewClicker(100_000, 32));

Players.PlayerAdded.Connect((player: Player) => {
  // NOTE: no data stores in the test project
  PlayerDataMap.set(player.Name, NewPlayerData());
});
