import { UserInputService, Players } from "@rbxts/services";
import Remotes from "shared/remotes";
import Roact from "@rbxts/roact";

const [money, updateMoney] = Roact.createBinding(0);
const [clicks, updateClicks] = Roact.createBinding(0);
const [maxClicks, updateMaxClicks] = Roact.createBinding(10);

UserInputService.InputBegan.Connect(async (input, processed) => {
  if (processed) return;

  if (input.UserInputType === Enum.UserInputType.MouseButton1) {
    updateClicks(await Remotes.Client.Get("SubmitClick").CallServerAsync());
  }
});

const MoneyClicksComponent = (
  money: Roact.Binding<number>,
  clicks: Roact.Binding<number>,
  maxClicks: Roact.Binding<number>
) => (
  <frame Size={new UDim2(0.2, 0, 0.2, 0)}>
    <textlabel
      Size={new UDim2(1, 0, 0.5, 0)}
      Text={clicks.map((value) => {
        return (
          "Clicks: " +
          value +
          maxClicks
            .map((value) => {
              return " / " + value;
            })
            .getValue()
        );
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

const SellComponent = () => (
  <frame Size={new UDim2(0.2, 0, 0.2, 0)} Position={new UDim2(0.8, 0, 0.8, 0)}>
    <textbutton
      Size={new UDim2(1, 0, 1, 0)}
      Text={"Sell"}
      Event={{
        MouseButton1Click: async () => {
          updateMoney(await Remotes.Client.Get("SubmitSell").CallServerAsync());
          updateClicks(0);
        },
      }}
    ></textbutton>
  </frame>
);

const ShopComponent = () => {};
const InventoryComponent = () => {};

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

Roact.mount(
  <screengui>
    {MoneyClicksComponent(money, clicks, maxClicks)}
    {SellComponent()}
  </screengui>,
  playerGui
);
