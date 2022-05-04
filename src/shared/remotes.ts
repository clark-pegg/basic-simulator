import Net from "@rbxts/net";

const Remotes = Net.CreateDefinitions({
  SubmitClick: Net.Definitions.ServerAsyncFunction<() => number>(),
  SubmitSell: Net.Definitions.ServerAsyncFunction<() => number>(),
});

export = Remotes;
