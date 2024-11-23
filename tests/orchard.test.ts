import { Orchard, Town } from "../src/network";

describe("Orchard with available trees", () => {
  const town1 = new Town("A", 10_000);
  const town2 = new Town("B", 12_000);
  const rate = 10;
  const start = 1000;
  const orchard = new Orchard("Beautiful Farm", rate, true, start, [
    town1,
    town2,
  ]);

  test("can get available apples", () => {
    expect(orchard.getValue()).toBe(start * 100);
  });

  test("running period and commit ", () => {
    orchard.runPeriod();
    orchard.commit();

    expect(orchard.numberOfTree).toBe(start - rate);
  });
});
describe("Orchard with no tree", () => {
  const town1 = new Town("A", 10_000);
  const town2 = new Town("B", 12_000);
  const rate = 10;
  const start = 5;
  const orchard = new Orchard("Dusty Farm", rate, true, start, [town1, town2]);

  test("running period and commit ", () => {
    orchard.runPeriod();
    orchard.commit();

    expect(orchard.isOpen).toBeFalsy();
    expect(orchard.numberOfTree).toBe(start + rate);
  });
});
