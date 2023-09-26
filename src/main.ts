import { FlightGraph } from "./grath/graph";
import { airports } from "./data/airports";
import { flights } from "./data/flights";
import { getAiportsDistance } from "./utils/get-distance-airports";

function comparator(a: string, b: string) {
  return a === b;
}

const graph = new FlightGraph<string>(comparator);

const nodes = airports.map((a) => ({
  name: a.iata,
  node: graph.addNode(a.iata),
}));

flights.forEach((f) =>
  graph.addEdge(
    f.origin,
    f.destination,
    getAiportsDistance({
      source: f.origin,
      destination: f.destination,
      unit: "mile",
    }),
    f.departureTime
  )
);

const node1 = nodes.find((n) => n.name === "DEN").node;

const node2 = nodes.find((n) => n.name === "SFO").node;

// DEN => SFO using BFS
const paths = graph.breadthFirstSearchPath(node1, node2, 10);

console.log(JSON.stringify(paths, null, 2));
