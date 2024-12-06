import { alg } from "@dagrejs/graphlib";
import { GraphLibNetwork, Network } from "./network";
import { Orchard } from "./orchard";
import { createGraph } from "./createGraph";

export class GraphlibNetworkProvider {
  orchards: Orchard[];
  constructor(orchards: Orchard[]) {
    this.orchards = orchards;
  }
  getNetworks(): Network[] {
    const g = createGraph(this.orchards);

    const toReturn: Network[] = [];

    // Find all possible networks based on provided nodes and edges
    // http://en.wikipedia.org/wiki/Connected_component_(graph_theory)
    const possibleNetworks = alg.components(g);

    for (const possibleNetwork of possibleNetworks) {
      const possibleOrchards = this.orchards.filter((o) => {
        return (
          possibleNetwork.find((pn) => pn === o.towns[0]) &&
          possibleNetwork.find((pn) => pn === o.towns[1])
        );
      });
      toReturn.push(new GraphLibNetwork(possibleOrchards));
    }

    return toReturn;
  }
}
