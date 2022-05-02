import Object from "@rbxts/object-utils";
import { CollectionService, LocalizationService, RunService } from "@rbxts/services";

export type RemoteString = "RemoteEvent" | "RemoteFunction";

type DefinitionRecord = Record<string, RemoteString>;

export const CreateDefinitions = <T extends DefinitionRecord>(declarations: T) => {
  if (RunService.IsServer()) {
    Object.entries(declarations).forEach(([name, remoteType]) => {
      const newRemote = new Instance(remoteType as RemoteString);
      newRemote.Name = name as string;
      newRemote.Parent = script.Parent?.WaitForChild("remotes");
      CollectionService.AddTag(newRemote, newRemote.Name);
    });
  }

  return {
    Get: (name: keyof T & string): RemoteFunction | RemoteEvent | undefined => {
      const remote = CollectionService.GetTagged(name)[0];

      return !remote
        ? undefined
        : remote.ClassName === "RemoteEvent"
        ? (remote as RemoteEvent)
        : remote.ClassName === "RemoteFunction"
        ? (remote as RemoteFunction)
        : undefined;
    },
  };
};
