import { ReplicatedStorage } from "@rbxts/services";
import Net from "@rbxts/net";

const DistanceMiddleware: Net.Middleware = (nextMiddleware, instance) => {
  return (sender, ...args) => {
    const distance = sender.Character?.PrimaryPart?.Position.Magnitude;

    if (distance && distance <= 50) {
      return nextMiddleware(sender, ...args);
    }
  };
};

export = Net.CreateDefinitions({
  // Returns new money on success, -1 on failure
  SubmitSell: Net.Definitions.ServerAsyncFunction<() => number>([
    Net.Middleware.RateLimit({
      MaxRequestsPerMinute: 600,
    }),
    DistanceMiddleware,
  ]),

  // Returns new clicks on success, -1 on failure
  SubmitClick: Net.Definitions.ServerAsyncFunction<() => number>([
    Net.Middleware.RateLimit({
      MaxRequestsPerMinute: 600,
    }),
  ]),
});

// maybe do this better... I don't like the client relying on a explicit
// server return... what to do...
