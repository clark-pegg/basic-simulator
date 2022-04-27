import { CreateDefinitions, Definitions, Middleware } from "@rbxts/net";

export const Remotes = CreateDefinitions({
  // Sells a player's clicks and returns new value
  // NOTE: Player's position will be checked before sell is allowed
  SubmitSell: Definitions.ServerAsyncFunction<() => number>([
    Middleware.RateLimit({
      MaxRequestsPerMinute: 600,
    }),
  ]),
  // Updates a players clicks and returns new value
  SubmitClick: Definitions.ServerAsyncFunction<() => number>([
    Middleware.RateLimit({
      // limit at 10 clicks per second, client will warn user
      // in normal use, this is just an added layer to stop exploiters
      MaxRequestsPerMinute: 600,
    }),
  ]),
  // Player request to change equipped item at index
  EquipBag: Definitions.ServerAsyncFunction<(index: number) => boolean>(),
  EquipClicker: Definitions.ServerAsyncFunction<(index: number) => boolean>(),
  // Player requsts to buy items
  BuyBag: Definitions.ServerAsyncFunction<(name: string) => boolean>(),
  BuyClicker: Definitions.ServerAsyncFunction<(name: string) => boolean>(),
  // Get current equipped items
  GetEquippedBag: Definitions.ServerAsyncFunction<() => number>(),
  GetEquippedClicker: Definitions.ServerAsyncFunction<() => number>(),
  // Get all items in inventory
  GetAllBags:
    Definitions.ServerAsyncFunction<() => { [key: string]: [string, number] }>(),
  GetAllClickers:
    Definitions.ServerAsyncFunction<() => { [key: string]: [string, number] }>(),
  // Returns a players stats
  GetClicks: Definitions.ServerAsyncFunction<() => number>(),
  GetMoney: Definitions.ServerAsyncFunction<() => number>(),
});
