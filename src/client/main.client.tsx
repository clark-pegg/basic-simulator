import { UserInputService, Players } from "@rbxts/services";
import Remotes from "shared/remotes";

UserInputService.InputBegan.Connect(async (input, processed) => {
  if (processed) return;
});
