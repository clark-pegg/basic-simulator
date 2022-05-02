import Roact from "@rbxts/roact";
import { Players, UserInputService, ReplicatedStorage } from "@rbxts/services";
import { Remotes } from "shared/remotes";

const [click, updateClick] = Roact.createBinding(0);
const [money, updateMoney] = Roact.createBinding(0);

const potato = Remotes.Get("SubmitClick") as RemoteFunction;
potato.InvokeServer();

const ErrorGui = (message: string) => (
  <screengui>
    <frame Size={new UDim2(0.2, 0, 0.2, 0)} Position={new UDim2(0.6, 0, 0.6, 0)}>
      <textlabel Size={new UDim2(1, 0, 1, 0)} Text={message}></textlabel>
    </frame>
  </screengui>
);

Roact.mount(
  <screengui>
    <frame Size={new UDim2(0.2, 0, 0.2, 0)}>
      <textlabel
        Size={new UDim2(1, 0, 0.5, 0)}
        Text={click.map((value: number): string => {
          return "Clicks: " + value;
        })}
      ></textlabel>
      <textlabel
        Size={new UDim2(1, 0, 0.5, 0)}
        Position={new UDim2(0, 0, 0.5, 0)}
        Text={money.map((value: number): string => {
          return "Money: " + value;
        })}
      ></textlabel>
    </frame>
  </screengui>,
  Players.LocalPlayer.WaitForChild("PlayerGui")
);
