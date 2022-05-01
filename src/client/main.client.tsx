import Roact from "@rbxts/roact";
import { Players, UserInputService, ReplicatedStorage } from "@rbxts/services";
import Remotes from "shared/remotes";

const [click, updateClick] = Roact.createBinding(0);
const [money, updateMoney] = Roact.createBinding(0);

UserInputService.InputBegan.Connect(async (input: InputObject, processed: boolean) => {
  if (processed) return;

  if (input.UserInputType === Enum.UserInputType.MouseButton1) {
    Remotes.Client.Get("SubmitClick")
      .CallServerAsync()
      .then((clicks: number) => {
        updateClick(clicks);
      });
    return;
  }
  if (input.UserInputType === Enum.UserInputType.MouseButton2) {
    Remotes.Client.Get("SubmitSell")
      .CallServerAsync()
      .then((value: number) => {
        updateMoney(value);
        updateClick(0);
      })
      .catch((reason: any) => {
        print(reason);
      });
  }
});

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
