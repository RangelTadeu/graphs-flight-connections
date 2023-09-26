import { flightsTestCase1 } from "../__tests__/mocks/flights.test-case-1";
import { flightsTestCase2 } from "../__tests__/mocks/flights.test-case-2";
import { airports } from "./data/airports";
import { FlightGraph } from "./grath/graph";
import { getAiportsDistance } from "./utils/get-distance-airports";

describe("Using graphs to find flight connections and departures", () => {
  let graph;
  let nodes;
  const comparator = (a: string, b: string) => a === b;

  beforeEach(() => {
    graph = new FlightGraph<string>(comparator);

    nodes = airports.map((a) => ({
      name: a.iata,
      node: graph.addNode(a.iata),
    }));
  });

  it("should find 3 routes from São Paulo (GRU) to Vancouver (YVR) using test-case 1", async () => {
    flightsTestCase1.forEach((f) =>
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

    const GRU = nodes.find((n) => n.name === "GRU").node;

    const YVR = nodes.find((n) => n.name === "YVR").node;

    const paths = graph.breadthFirstSearchPath(GRU, YVR, 10);

    const airCanada = paths[0].path.join("->");
    const american = paths[1].path.join("->");
    const aeromexico = paths[2].path.join("->");

    expect(paths.length).toBe(3);
    expect(airCanada).toBe("GRU->YYZ->YVR");
    expect(american).toBe("GRU->DFW->YVR");
    expect(aeromexico).toBe("GRU->MEX->YVR");
  });

  it("should find 1 route from Dallas (DFW) to Mexico (MEX) with test-case 1", async () => {
    flightsTestCase1.forEach((f) =>
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

    const DFW = nodes.find((n) => n.name === "DFW").node;

    const MEX = nodes.find((n) => n.name === "MEX").node;

    const paths = graph.breadthFirstSearchPath(DFW, MEX, 10);

    expect(paths.length).toBe(1);
    expect(paths[0].path.join("->")).toBe("DFW->GRU->MEX");
  });

  it("Route GRU->YYZ should have 3 departures from GRU to YVR using test case 2", async () => {
    flightsTestCase2.forEach((f) =>
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

    const GRU = nodes.find((n) => n.name === "GRU").node;

    const YVR = nodes.find((n) => n.name === "YVR").node;

    const paths = graph.breadthFirstSearchPath(GRU, YVR, 10);

    const route = paths[0].routes.find((r) => r.name === "GRU->YYZ");

    expect(route.departures.length).toBe(3);
  });

  it("Route YYZ->YVR should have 2 departures from GRU to YVR using test case 2", async () => {
    flightsTestCase2.forEach((f) =>
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

    const GRU = nodes.find((n) => n.name === "GRU").node;

    const YVR = nodes.find((n) => n.name === "YVR").node;

    const paths = graph.breadthFirstSearchPath(GRU, YVR, 10);

    const route = paths[0].routes.find((r) => r.name === "YYZ->YVR");

    expect(route.departures.length).toBe(2);
  });
});
