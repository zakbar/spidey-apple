import { GraphLibNetwork } from "../src/network";
import { Orchard } from "../src/orchard";

describe("Simple 2 nodes network", () => {
  const town1 = "A";
  const town2 = "B";
  const rate = 10;
  const start = 1000;
  const orchard = new Orchard("Beautiful Farm", rate, true, start, [
    town1,
    town2,
  ]);

  const cut = new GraphLibNetwork([orchard]);
  test("Can return size of the network based on towns", () => {
    expect(cut.getSize()).toBe(2);
  });

  cut.executeSearch();

  test("Can get open orchards", () => {
    const openOrchards = cut.getOpenOrchards();
    expect(openOrchards.length).toBe(1);
    expect(openOrchards[0]).toBe(orchard);
    expect(cut.getCloseOrchards().length).toBe(0);
  });
});

describe("Simple 3 nodes network ", () => {
  const town1 = "A";
  const town2 = "B";
  const town3 = "C";
  const rate = 10;
  const start = 1000;
  const orchard1 = new Orchard("Farm 1", rate, true, start, [town1, town2]);
  const orchard2 = new Orchard("Farm 2", rate, true, start, [town2, town3]);
  const orchard3 = new Orchard("Farm 3", rate, true, 0, [town1, town3]);

  const cut = new GraphLibNetwork([orchard1, orchard2, orchard3]);
  test("Can return size of the network based on towns", () => {
    expect(cut.getSize()).toBe(3);
  });

  cut.executeSearch();

  test("Can get open orchards", () => {
    const openOrchards = cut.getOpenOrchards();
    expect(openOrchards.length).toBe(2);
    expect(openOrchards[0]).toBe(orchard1);
    expect(openOrchards[1]).toBe(orchard2);
    expect(cut.getCloseOrchards().length).toBe(1);
  });
});
