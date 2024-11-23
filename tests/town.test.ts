import { Town } from "../src/network";

describe("Town", () => {
  const town = new Town("New York", 100);
  test("it will always consume apples (negative values)", () => {
    expect(town.getValue()).toBe(-100);
  });
});
