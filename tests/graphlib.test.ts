import { alg, Graph } from "@dagrejs/graphlib";

test("Generate Basic ", () => {
  const g = new Graph({ directed: false });
  g.setNode("A");
  g.setNode("B");
  g.setNode("C");
  g.setNode("D");
  g.setNode("E");

  g.setEdge("A", "B");
  g.setEdge("A", "C");
  g.setEdge("B", "C");
  g.setEdge("B", "D");
  g.setEdge("D", "E");
  g.setEdge("C", "E");

  const mapWeight = new Map<string, number>();
  mapWeight.set("AB", 10);
  mapWeight.set("AC", 20);
  mapWeight.set("BC", 30);
  mapWeight.set("BD", 40);
  mapWeight.set("ED", 50);
  mapWeight.set("CE", 60);

  const calculated = alg.prim(
    g,
    (e) => mapWeight.get(`${[e.v, e.w].sort().join("")}`) ?? 1
  );

  expect(calculated.edges()).toMatchSnapshot();
});
491;

test("Multiple Network ", () => {
  const g = new Graph({ directed: false });
  g.setNode("A");
  g.setNode("B");
  g.setNode("C");
  g.setNode("D");
  g.setNode("E");

  g.setEdge("A", "B");
  g.setEdge("A", "C");
  g.setEdge("B", "C");
  g.setEdge("D", "E");

  const mapWeight = new Map<string, number>();
  mapWeight.set("AB", 10);
  mapWeight.set("AC", 20);
  mapWeight.set("BC", 30);
  mapWeight.set("BD", 40);
  mapWeight.set("ED", 50);
  mapWeight.set("CE", 60);

  expect(alg.components(g)).toMatchSnapshot();
});
