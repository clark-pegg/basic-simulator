import Roact from "@rbxts/roact";
import { Players, ProximityPromptService } from "@rbxts/services";
import { Remotes } from "shared/remotes";
import { UserInputService } from "@rbxts/services";

const [click, updateClick] = Roact.createBinding(0);
const [money, updateMoney] = Roact.createBinding(0);

UserInputService.InputBegan.Connect(async (input: InputObject, processed: boolean) => {
  if (processed) return;

  if (input.UserInputType === Enum.UserInputType.MouseButton1) {
    const newClicks = await Remotes.Client.Get("SubmitClick").CallServerAsync();

    if (newClicks === -1) {
      print("Something went wrong clicking");
    } else {
      updateClick(newClicks);
    }
  } else if (input.UserInputType === Enum.UserInputType.MouseButton2) {
    const newMoney = await Remotes.Client.Get("SubmitSell").CallServerAsync();

    if (newMoney === -1) {
      print("Too far from spawn!");
    } else {
      updateClick(0);
      updateMoney(newMoney);
    }
  }
});

function GuiComponent(clickComponent: Roact.Element, moneyComponent: Roact.Element) {
  return (
    <screengui>
      <frame Size={new UDim2(0.2, 0, 0.2, 0)}>
        {clickComponent}
        {moneyComponent}
      </frame>
    </screengui>
  );
}

function ClickComponent(props: Roact.Binding<number>) {
  return (
    <textlabel
      Size={new UDim2(1, 0, 0.5, 0)}
      Text={props.map((value: number): string => {
        return "Clicks: " + value;
      })}
    ></textlabel>
  );
}

function MoneyComponent(props: Roact.Binding<number>) {
  return (
    <textlabel
      Size={new UDim2(1, 0, 0.5, 0)}
      Position={new UDim2(0, 0, 0.5, 0)}
      Text={props.map((value: number): string => {
        return "Money: " + value;
      })}
    ></textlabel>
  );
}

const Gui = Roact.mount(
  GuiComponent(ClickComponent(click), MoneyComponent(money)),
  Players.LocalPlayer.WaitForChild("PlayerGui")
);
