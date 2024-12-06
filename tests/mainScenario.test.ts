import { Orchard } from "../src/orchard";
import { Schedule } from "../src/schedule";
import { triggerPeriodCycle } from "../src/triggerPeriodCycle";

describe("12 Periods Scenario", () => {
  const townA = "A";
  const townB = "B";
  const townC = "C";
  const townD = "D";
  const townE = "E";
  const towns = [townA, townB, townC, townD, townE];

  const rate = 100;
  const start = 500;
  const numberOfPeriods = 12;
  const orchard1 = new Orchard("Orchard 1", rate, true, start, [townA, townB]);
  const orchard2 = new Orchard("Orchard 2", rate, true, start, [townA, townC]);
  const orchard3 = new Orchard("Orchard 3", rate, true, start, [townB, townC]);
  const orchard4 = new Orchard("Orchard 4", rate, true, start, [townB, townD]);
  const orchard5 = new Orchard("Orchard 5", rate, true, start, [townD, townE]);
  const orchard6 = new Orchard("Orchard 6", rate, true, start, [townC, townE]);
  const orchards = [orchard1, orchard2, orchard3, orchard4, orchard5, orchard6];
  const schedules: Schedule[] = [];

  for (let i = 1; i <= numberOfPeriods; i++) {
    test(`Period ${i}`, () => {
      const schedule = triggerPeriodCycle(orchards, towns);
      schedules.push(schedule);

      expect(schedule).toMatchSnapshot();
    });
  }
});
