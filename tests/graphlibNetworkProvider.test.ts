import { GraphlibNetworkProvider } from "../src/networkProvider";
import { Orchard } from "../src/orchard";

describe("Graphlib Network Provider implementation", () => {
  test("Can create networks", () => {
    const town1 = "A";
    const town2 = "B";
    const rate = 10;
    const start = 1000;
    const orchard = new Orchard("Beautiful Farm", rate, true, start, [
      town1,
      town2,
    ]);

    const cut = new GraphlibNetworkProvider([orchard]);
    const networks = cut.getNetworks();

    expect(networks.length).toBe(1);
    expect(networks[0].getSize()).toBe(2);
  });
});
