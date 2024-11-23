import {
  INetworkProvider,
  Orchard,
  Town,
  triggerPeriodCycle,
} from "../src/network";

const townA = new Town("A", 100);
const townB = new Town("B", 90);
const townC = new Town("C", 80);
const townD = new Town("D", 0);
const orchard1 = new Orchard("1", 4, true, 20, [townA, townB]);
const orchard2 = new Orchard("2", 3, true, 15, [townA, townC]);
const orchard3 = new Orchard("3", 2, true, 7, [townC, townD]);

const mockNetworkProvider: INetworkProvider = {
  getNetworks: () => {
    return [
      {
        getSize: () => 10,
        executeSearch: () => {},
        getOpenOrchards: () => [orchard1, orchard2],
        getCloseOrchards: () => [orchard3],
      },
    ];
  },
};

describe("Trigger Period Cycle", () => {
  test("Get Schedule", () => {
    const schedule = triggerPeriodCycle(mockNetworkProvider);
    expect(schedule).toMatchSnapshot();
  });
});
