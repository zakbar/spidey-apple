import { alg, Edge, Graph } from "@dagrejs/graphlib";
import { Orchard } from "./orchard";
import { createGraph } from "./createGraph";

export interface Network {
  getSize: () => number;
  executeSearch: () => void;
  getOpenOrchards: () => Orchard[];
}

export class GraphLibNetwork implements Network {
  orchards: Orchard[];
  graph: Graph;
  openOrchards: Orchard[] = [];

  constructor(orchards: Orchard[]) {
    this.orchards = orchards;

    this.graph = createGraph(orchards);
  }

  getSize() {
    return this.graph.nodeCount();
  }
  executeSearch() {
    // Edge's prim algo weight evaluation is to check if it is best
    // to open in this period based on when was it open and
    // orchard's number of trees available against total available.
    // ref=https://en.wikipedia.org/wiki/Prim%27s_algorithm
    const mapWeight = new Map<string, number>();

    const totalOpen = this.orchards
      .filter((o) => o.isOpen)
      .reduce((partialSum, a) => partialSum + a.numberOfTree, 0);

    for (const orchard of this.orchards) {
      mapWeight.set(
        orchard.name,
        -(((1 + orchard.getWeight()) * orchard.numberOfTree) / totalOpen)
      );
    }

    const calculateWeight = (e: Edge) =>
      mapWeight.get(this.graph.edge(e.v, e.w) ?? "") ?? 1;

    const evaluatedGraphs = alg.prim(this.graph, calculateWeight);

    // End of prim algo calc

    const edges = evaluatedGraphs.edges();
    this.openOrchards = edges
      .map((e) =>
        this.orchards.find((o) => o.name === this.graph.edge(e.v, e.w))
      )
      .filter((o) => o !== undefined);
  }
  getOpenOrchards(): Orchard[] {
    return this.openOrchards;
  }
  getCloseOrchards(): Orchard[] {
    return this.orchards.filter(
      (o) => this.openOrchards.find((oc) => o === oc) === undefined
    );
  }
}
