import { Bag, NewBag } from "server/bag";
import { Clicker, NewClicker } from "server/clicker";
import { Remotes } from "shared/remotes";

export type PlayerData = Readonly<{
  money: number;
  clicks: number;
  bags: ReadonlyMap<string, Bag>;
  clickers: ReadonlyMap<string, Clicker>;
  equipped: [Bag, Clicker];
}>;

export const NewPlayerData = (): PlayerData => {
  return {
    money: 0,
    clicks: 0,
    bags: new Map<string, Bag>(),
    clickers: new Map<string, Clicker>(),
    equipped: [NewBag(0, 10), NewClicker(0, 2)],
  };
};

export const PlayerDataMap = new Map<string, PlayerData>();

Remotes.Server.OnFunction("SubmitClick", (player: Player): number => {
  const data: PlayerData | undefined = PlayerDataMap.get(player.Name);

  if (!data) return -1;

  PlayerDataMap.set(player.Name, {
    money: data.money,
    clicks: math.min(data.clicks + data.equipped[1].power, data.equipped[0].storage),
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  });

  return math.min(data.clicks + data.equipped[1].power, data.equipped[0].storage);
});

Remotes.Server.OnFunction("SubmitSell", (player: Player): number => {
  const data: PlayerData | undefined = PlayerDataMap.get(player.Name);
  const distance: number | undefined = player.Character?.PrimaryPart?.Position?.Magnitude;

  if (!data || !distance || distance > 50) return -1;

  PlayerDataMap.set(player.Name, {
    money: data.money + data.clicks,
    clicks: 0,
    bags: data.bags,
    clickers: data.clickers,
    equipped: data.equipped,
  });

  return data.money + data.clicks;
});
