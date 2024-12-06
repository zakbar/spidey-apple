import { Orchard } from "../src/orchard";

describe("Orchard with available trees", () => {
  const town1 = "A";
  const town2 = "B";
  const rate = 10;
  const start = 1000;
  const orchard = new Orchard("Beautiful Farm", rate, true, start, [
    town1,
    town2,
  ]);

  test("can get weight", () => {
    expect(orchard.getWeight()).toBe(0);
  });

  test("running period and commit ", () => {
    orchard.ensureClose();
    orchard.commit();

    expect(orchard.numberOfTree).toBe(start - rate);
  });
});
describe("Orchard with no tree", () => {
  const town1 = "A";
  const town2 = "B";
  const rate = 10;
  const start = 5;
  const orchard = new Orchard("Dusty Farm", rate, true, start, [town1, town2]);

  test("running period and commit ", () => {
    orchard.ensureClose();
    orchard.commit();

    expect(orchard.isOpen).toBe(false);
    expect(orchard.numberOfTree).toBe(start + rate);
  });
});
describe("Close Orchard with no tree", () => {
  const town1 = "A";
  const town2 = "B";
  const rate = 10;
  const start = 15;
  const orchard = new Orchard("Dusty Farm", rate, false, start, [town1, town2]);

  test("running period and commit ", () => {
    orchard.ensureClose();
    orchard.open();
    orchard.commit();

    expect(orchard.numberOfTree).toBe(start - rate);
  });
});
