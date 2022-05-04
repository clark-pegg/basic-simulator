import Net from "@rbxts/net";
import { NamespaceBuilder } from "@rbxts/net/out/definitions/NamespaceBuilder";
import Object from "@rbxts/object-utils";
import { CollectionService, RunService } from "@rbxts/services";

interface ServerFunctionLike {
  readonly Type: "ServerFunction";
  readonly InstanceType: "RemoteFunction";
}

interface ServerEventLike {
  readonly Type: "ServerEvent";
  readonly InstanceType: "RemoteEvent";
}

interface ClientEventLike {
  readonly Type: "ClientEvent";
  readonly InstanceType: "RemoteEvent";
}

interface ServerFunction<T extends Callback> extends ServerFunctionLike {}
interface ServerEvent<T extends readonly any[]> extends ServerEventLike {}
interface ClientEvent<T extends readonly any[]> extends ClientEventLike {}

export const CreateServerFunction = <T extends Callback>() => {
  return {
    Type: "ServerFunction",
    InstanceType: "RemoteFunction",
  } as ServerFunction<T>;
};

export const CreateServerEvent = <T extends readonly any[]>() => {
  return {
    Type: "ServerEvent",
    InstanceType: "RemoteEvent",
  } as ServerEvent<T>;
};

export const CreateClientEvent = <T extends readonly any[]>() => {
  return {
    Type: "ClientEvent",
    InstanceType: "RemoteEvent",
  } as ClientEvent<T>;
};

type RemoteLike = ServerFunctionLike | ServerEventLike | ClientEventLike;

type BuildResult<T extends Record<string, RemoteLike>> = {
  [P in keyof T]: T[P] extends ServerFunction<infer A>
    ? (player: Player, ...args: Parameters<A>) => Promise<ReturnType<A>>
    : T[P] extends ServerEvent<infer A>
    ? (player: Player, ...args: A) => void
    : T[P] extends ClientEvent<infer A>
    ? [player: Player, ...args: A]
    : never;
};

export const CreateDefinitions = <T extends Record<string, RemoteLike>>(record: T) => {
  if (RunService.IsServer()) {
    Object.entries(record).forEach(([key, entry]) => {
      const newRemote = new Instance((entry as RemoteLike).InstanceType);
      newRemote.Name = key as string;
      newRemote.Parent = script.Parent?.WaitForChild("remotes");
      CollectionService.AddTag(newRemote, (entry as RemoteLike).Type);
    });
  }

  const GetRemote = (name: keyof T) => {
    const remote = CollectionService.GetTagged(record[name].Type).find(
      (element) => element.Name === name
    );

    return remote ? remote : error("Couldn't find remote!");
  };

  return {
    SetCallback: <B extends keyof BuildResult<ExtractMembers<T, ServerFunctionLike>>>(
      name: B,
      callback: BuildResult<T>[B]
    ) => {
      const remote = GetRemote(name) as RemoteFunction;
      remote.OnServerInvoke = callback as Callback;
    },
    SetBinding: <B extends keyof BuildResult<ExtractMembers<T, ServerEventLike>>>(
      name: B,
      callback: BuildResult<T>[B]
    ) => {},
    CallEvent: <B extends keyof BuildResult<ExtractMembers<T, ClientEventLike>>>(
      name: B,
      args: BuildResult<T>[B]
    ) => {},
    CallServerFunction: <
      B extends keyof BuildResult<ExtractMembers<T, ServerFunctionLike>>
    >(
      name: B,
      args: Parameters<BuildResult<T>[B]>
    ): ReturnType<BuildResult<T>[B]> => {
      const remote = GetRemote(name) as RemoteFunction;
      return remote.InvokeServer(args);
    },
  };
};
