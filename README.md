# Finding Flight Connections with Graphs

This is my implementation of a graph to find paths between airports using Breadth-first search (BFS) to discover routes, connections, distance, and list departure times.

## Run Locally

Clone the project

```bash
git clone git@github.com:RangelTadeu/graphs-flight-connections.git
```

Navigate to the project directory

```bash
cd graphs-flight-connections
```

Install dependencies

```bash
yarn
```

## Running Tests

To run tests, use the following command

```bash
yarn test
```

## Demo

First, we need to add the airports as nodes. I am using the IATA code as data for the node.

```javascript
const comparator = (a: string, b: string) => a === b;

const graph = new FlightGraph() < string > comparator;

const nodes = airports.map((a) => ({
  name: a.iata,
  node: graph.addNode(a.iata),
}));
```

Then we add the flights as edges with distance as weight and departure time.

```javascript
edges.forEach((flight) =>
  graph.addEdge(
    flight.origin,
    flight.destination,
    getAiportsDistance({
      source: f.origin,
      destination: f.destination,
      unit: "mile",
    }),
    flight.departureTime
  )
);
```

The graph for flights.test-case-1.ts should look like this:

![graph](https://github.com/RangelTadeu/graphs-flight-connections/blob/main/docs/graph-test-case-1.png?raw=true)

### Finding Paths

```javascript
const GRU = nodes.find((n) => n.name === "GRU").node;
const YVR = nodes.find((n) => n.name === "YVR").node;

const paths = graph.breadthFirstSearchPath(GRU, YVR, 10);
```

In this graph, we should find 3 paths:

- **GRU->YYZ->YVR**
- **GRU->DFW->YVR**
- **GRU->MEX->YVR**

If we change the origin and destination to DFW and MEX, we should get just one:

- **DFW->GRU->MEX**

### Departure Times

Departure times are crucial in this domain. In flights.test-case-2, using the path **GRU->YYZ->YVR**, the response should include:

- Three departures on the route **GRU->YYZ**
- Two departures on the route **YYZ->YVR**

In all answers the distance will be shown in miles

## Optimizations

The next step is to create the solution using Neo4j.
