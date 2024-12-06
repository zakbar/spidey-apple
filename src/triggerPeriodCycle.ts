import { getCombinations } from "./getCombinations";
import { GraphlibNetworkProvider } from "./networkProvider";
import { Orchard } from "./orchard";
import { Schedule } from "./schedule";
import { ScheduleEntry } from "./scheduleEntry";

const processSinglePeriod = (orchards: Orchard[]) => {
  for (const orchard of orchards) {
    orchard.ensureClose();
  }
  const readyOrchards = orchards.filter((o) => o.isOpen);
  const networkProvider = new GraphlibNetworkProvider(readyOrchards);
  const networks = networkProvider
    .getNetworks()
    .sort((a, b) => a.getSize() - b.getSize());
  let orchardStatuses: ScheduleEntry[] = [];

  let allNetworkOpenOrchards: Orchard[] = [];
  for (const network of networks) {
    network.executeSearch();
    const openOrchards = network.getOpenOrchards();
    allNetworkOpenOrchards = [...allNetworkOpenOrchards, ...openOrchards];
    orchardStatuses = [
      ...orchardStatuses,
      ...openOrchards.map((l) => ({
        name: l.name,
        isOpen: true,
        currentTree: l.numberOfTree,
      })),
    ];
  }

  const openOrchards = orchardStatuses.map((o) => o.name);
  for (const orchard of orchards) {
    if (!openOrchards.find((o) => o === orchard.name)) {
      orchard.close();
      orchardStatuses.push({
        isOpen: false,
        name: orchard.name,
        currentTree: orchard.numberOfTree,
      });
    }
    orchard.commit();
  }

  return {
    orchardStatuses: orchardStatuses.sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  };
};

const simulateDoublePeriodMovement = (
  originals: Orchard[],
  towns: string[],
  opennableOrchards: string[],
  isLast: boolean = false
): { orchardStatuses: ScheduleEntry[] } | undefined => {
  const orchards = originals.map((o) => o.clone());
  if ((opennableOrchards?.length ?? 0) > 0) {
    for (const opennableOrchard of opennableOrchards!) {
      orchards.find((o) => o.name === opennableOrchard)?.open();
    }
  }
  let result = processSinglePeriod(orchards);

  if (!isLast) {
    const combination = combinationOfOpennableOrchards(orchards);

    while (combination.length > 0) {
      const possibleOpennableOrchards = combination.pop();
      if (possibleOpennableOrchards) {
        const result = simulateDoublePeriodMovement(
          orchards,
          towns,
          possibleOpennableOrchards,
          true
        );
        if (
          result &&
          isAllTownsServiced(towns, orchards, result.orchardStatuses)
        ) {
          return result;
        }
      }
    }
  } else {
    return result;
  }
};

const combinationOfOpennableOrchards = (orchards: Orchard[]) =>
  getCombinations(
    orchards
      .filter((o) => o.canBeOpen())
      .sort((a, b) => a.numberOfTree - b.numberOfTree)
      .map((o) => o.name)
  );

const getServicedTown = (orchards: Orchard[], openOrchards: ScheduleEntry[]) =>
  [
    ...new Set(
      orchards
        .filter((o) => openOrchards.find((f) => f.name === o.name && f.isOpen))
        .flatMap((o) => o.towns)
    ),
  ].sort((a, b) => a.localeCompare(b));

const isAllTownsServiced = (
  towns: string[],
  orchards: Orchard[],
  openOrchards: ScheduleEntry[]
) => {
  const servicedTowns = getServicedTown(orchards, openOrchards);
  const result = !towns.some((o) => !servicedTowns.find((t) => o === t));

  return result;
};

const triggerPeriodCycle = (
  originals: Orchard[],
  towns: string[]
): Schedule => {
  const opennableOrchardCombinations =
    combinationOfOpennableOrchards(originals);

  while (opennableOrchardCombinations.length > 0) {
    // Try to open closed orchards and simulate the next 2 periods to ensure all towns can be serviced.
    // Otherwise just pick whatever available.
    const opennableOrchards = opennableOrchardCombinations.pop();
    if (opennableOrchards && opennableOrchards.length > 0) {
      const nextPeriodResult = simulateDoublePeriodMovement(
        originals,
        towns,
        opennableOrchards
      );
      if (
        nextPeriodResult &&
        isAllTownsServiced(towns, originals, nextPeriodResult.orchardStatuses)
      ) {
        for (const opennableOrchard of opennableOrchards!) {
          originals.find((o) => o.name === opennableOrchard)?.open();
        }
        break;
      }
    }
  }
  return processSinglePeriod(originals);
};

export { triggerPeriodCycle, getServicedTown };
