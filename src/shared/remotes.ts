import Net from "@rbxts/net";

const Remotes = Net.CreateDefinitions({
  SubmitClick: Net.Definitions.ServerAsyncFunction<() => number>(),
  SubmitSell: Net.Definitions.ServerAsyncFunction<() => number>(),
  BuyBag: Net.Definitions.ServerAsyncFunction<(name: string) => boolean>(),
  BuyClicker: Net.Definitions.ServerAsyncFunction<(name: string) => boolean>(),
  EquipBag: Net.Definitions.ServerAsyncFunction<(index: number) => boolean>(),
  EquipClicker: Net.Definitions.ServerAsyncFunction<(index: number) => boolean>(),
});

export = Remotes;
