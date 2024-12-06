import { Orchard } from "./orchard";
import { Schedule } from "./schedule";
import { getServicedTown, triggerPeriodCycle } from "./triggerPeriodCycle";

const townA = "A";
const townB = "B";
const townC = "C";
const townD = "D";
const townE = "E";
const towns = [townA, townB, townC, townD, townE];

const rate = 100;
const start = 501;
const numberOfPeriods = 12;
const orchard1 = new Orchard("1", rate, true, start, [townA, townB]);
const orchard2 = new Orchard("2", rate, true, start, [townA, townC]);
const orchard3 = new Orchard("3", rate, true, start, [townB, townC]);
const orchard4 = new Orchard("4", rate, true, start, [townB, townD]);
const orchard5 = new Orchard("5", rate, true, start, [townD, townE]);
const orchard6 = new Orchard("6", rate, true, start, [townC, townE]);
const orchards = [orchard1, orchard2, orchard3, orchard4, orchard5, orchard6];
const schedules: Schedule[] = [];

for (let i = 1; i <= numberOfPeriods; i++) {
  const schedule = triggerPeriodCycle(orchards, towns);
  schedules.push(schedule);
}

console.table(
  schedules.map((o, i) => {
    const obj: any = {};

    obj["period"] = i + 1;
    let total = 0;
    for (const status of o.orchardStatuses) {
      obj[`orchard ${status.name} status`] = status.isOpen ? "open" : "close";
      obj[`orchard ${status.name} # tree`] = status.currentTree;
      total += status.isOpen ? status.currentTree : 0;
    }
    obj["serviced towns"] = getServicedTown(orchards, o.orchardStatuses).join(
      ", "
    );
    obj["total tree"] = total;
    return obj;
  })
);
