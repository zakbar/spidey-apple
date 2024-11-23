interface INetwork {
  getSize: () => number;
  executeSearch: () => void;
  getOpenOrchards: () => Orchard[];
  getCloseOrchards: () => Orchard[];
}

interface INode {
  getValue: () => number;
}

class Orchard implements INode {
  name: string;
  rate: number;
  isOpen: boolean;
  numberOfTree: number;
  towns: Town[];

  constructor(
    name: string,
    rate: number,
    isOpen: boolean,
    numberOfTree: number,
    towns: Town[]
  ) {
    this.name = name;
    this.rate = rate;
    this.isOpen = isOpen;
    this.numberOfTree = numberOfTree;
    this.towns = towns;
  }

  getValue = () => {
    //assumption 1 tree = 100 apples
    const ratioTreeToApple = 100;
    return this.numberOfTree * ratioTreeToApple;
  };

  close = () => {
    this.isOpen = false;
  };

  runPeriod = () => {
    if (this.numberOfTree - this.rate <= 0) {
      this.close();
    } else {
      this.isOpen = true;
    }
  };
  commit = () => {
    if (this.isOpen) {
      this.numberOfTree -= this.rate;
    } else {
      this.numberOfTree += this.rate;
    }
  };
}

class Town implements INode {
  name: string;
  consumptionRate: number;

  constructor(name: string, consumptionRate: number) {
    this.name = name;
    this.consumptionRate = consumptionRate;
  }

  getValue = () => {
    return -this.consumptionRate;
  };
}

interface INetworkProvider {
  getNetworks: () => INetwork[];
}

interface ScheduleEntry {
  name: string;
  isOpen: boolean;
}
interface Schedule {
  orchardStatuses: ScheduleEntry[];
}
const triggerPeriodCycle = (networkProvider: INetworkProvider): Schedule => {
  const networks = networkProvider
    .getNetworks()
    .sort((a, b) => a.getSize() - b.getSize());
  let orchardStatuses: ScheduleEntry[] = [];
  for (const network of networks) {
    network.executeSearch();
    orchardStatuses = [
      ...orchardStatuses,
      ...network.getOpenOrchards().map((l) => ({ name: l.name, isOpen: true })),
      ...network
        .getCloseOrchards()
        .map((l) => ({ name: l.name, isOpen: false })),
    ];
  }
  return { orchardStatuses };
};

export { Town, Orchard, triggerPeriodCycle, INetworkProvider };
