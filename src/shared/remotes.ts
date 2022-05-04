import {
  CreateDefinitions,
  CreateServerFunction,
  CreateServerEvent,
  CreateClientEvent,
} from "networking/manager";

const Remotes = CreateDefinitions({
  SubmitClick: CreateServerFunction<() => number>(),
  SubmitPotato: CreateServerFunction<() => string>(),
  CallServer: CreateServerEvent<[message: string]>(),
  CallClient: CreateClientEvent<[message: string]>()
});

export = Remotes;
