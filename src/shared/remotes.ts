import Net from "@rbxts/net";

const Remotes = Net.CreateDefinitions({
  SubmitClick: Net.Definitions.ServerAsyncFunction<() => number>(),
  SubmitSell: Net.Definitions.ServerAsyncFunction<() => number>(),
  BuyBag: Net.Definitions.ServerAsyncFunction<(name: string) => boolean>(),
  BuyClicker: Net.Definitions.ServerAsyncFunction<(name: string) => boolean>(),
});

export = Remotes;
