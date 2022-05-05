import { UserInputService, Players } from "@rbxts/services";
import Remotes from "shared/remotes";
import Roact from "@rbxts/roact";

const [money, updateMoney] = Roact.createBinding(0);
const [clicks, updateClicks] = Roact.createBinding(0);

UserInputService.InputBegan.Connect(async (input, processed) => {
  if (processed) return;

  if (input.UserInputType === Enum.UserInputType.MouseButton1) {
    updateClicks(await Remotes.Client.Get("SubmitClick").CallServerAsync());
  }
});

const MoneyClicksComponent = (
  money: Roact.Binding<number>,
  clicks: Roact.Binding<number>
) => (
  <frame Size={new UDim2(0.2, 0, 0.2, 0)}>
    <textlabel
      Size={new UDim2(1, 0, 0.5, 0)}
      Text={clicks.map((value) => {
        return "Clicks: " + value;
      })}
      Position={new UDim2(0, 0, 0, 0)}
    ></textlabel>
    <textlabel
      Size={new UDim2(1, 0, 0.5, 0)}
      Text={money.map((value) => {
        return "Money: " + value;
      })}
      Position={new UDim2(0, 0, 0.5, 0)}
    ></textlabel>
  </frame>
);

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

Roact.mount(<screengui>{MoneyClicksComponent(money, clicks)}</screengui>, playerGui);
