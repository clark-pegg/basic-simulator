import { ReplicatedStorage } from "@rbxts/services";
import Net from "@rbxts/net";

const DistanceMiddleware = (info: {
  Location: Vector3;
  Distance: number;
}): Net.Middleware => {
  return (nextMiddleware, instance) => {
    return (sender, ...args) => {
      const position = sender.Character?.PrimaryPart?.Position;

      if (position) {
        if (position.sub(info.Location).Magnitude <= info.Distance) {
          return nextMiddleware(sender, ...args);
        }
      }
    };
  };
};

export = Net.CreateDefinitions({
  // Returns new money on success, -1 on failure
  SubmitSell: Net.Definitions.ServerAsyncFunction<() => number>([
    Net.Middleware.RateLimit({
      MaxRequestsPerMinute: 600,
    }),
    DistanceMiddleware({
      Location: new Vector3(0, 0, 0),
      Distance: 50,
    }),
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
