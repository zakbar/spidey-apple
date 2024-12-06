export class Orchard {
  name: string;
  rate: number;
  isOpen: boolean;
  numberOfTree: number;
  towns: string[];
  weight: number;

  constructor(
    name: string,
    rate: number,
    isOpen: boolean,
    numberOfTree: number,
    towns: string[],
    weight: number = 0
  ) {
    this.name = name;
    this.rate = rate;
    this.isOpen = isOpen;
    this.numberOfTree = numberOfTree;
    this.towns = towns;
    this.weight = weight;
  }
  getWeight = () => {
    return this.weight;
  };

  close = () => {
    this.weight = 0;
    this.isOpen = false;
  };

  ensureClose = () => {
    if (this.numberOfTree <= this.rate) {
      this.close();
    }
  };
  commit = () => {
    if (this.isOpen) {
      this.numberOfTree -= this.rate;
      this.ensureClose();
    } else {
      this.numberOfTree += this.rate;
    }
    this.weight = 0;
  };

  open = () => {
    this.weight = 0.5;
    this.isOpen = true;
  };

  clone = () => {
    return new Orchard(
      this.name,
      this.rate,
      this.isOpen,
      this.numberOfTree,
      this.towns,
      this.weight
    );
  };

  canBeOpen = () => !this.isOpen && this.numberOfTree > this.rate;
}
