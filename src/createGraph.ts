import { Graph } from "@dagrejs/graphlib";
import { Orchard } from "./orchard";

const createGraph = (orchards: Orchard[]): Graph => {
  const g = new Graph({ directed: false, multigraph: true });
  const towns = getUniqueTowns(orchards);
  for (const town of towns) {
    g.setNode(town);
  }
  for (const orchard of orchards) {
    g.setEdge(orchard.towns[0], orchard.towns[1], orchard.name);
  }
  return g;
};

const getUniqueTowns = (orchards: Orchard[]) => [
  ...new Set(orchards.flatMap((o) => o.towns)),
];

export { createGraph, getUniqueTowns };
