import { triggerPeriodCycle } from "../src/triggerPeriodCycle";
import { Orchard } from "../src/orchard";

const townA = "A";
const townB = "B";
const townC = "C";
const townD = "D";
const orchard1 = new Orchard("1", 4, true, 20, [townA, townB]);
const orchard2 = new Orchard("2", 3, true, 15, [townA, townC]);
const orchard3 = new Orchard("3", 2, true, 7, [townC, townD]);

describe("Trigger Period Cycle", () => {
  test("Get Schedule", () => {
    const schedule = triggerPeriodCycle(
      [orchard1, orchard2, orchard3],
      [townA, townB, townC, townD]
    );
    expect(schedule).toMatchSnapshot();
  });
});
