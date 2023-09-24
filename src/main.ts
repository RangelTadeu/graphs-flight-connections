import { Graph } from "./grath/graph";

type Airport = {
  airportId: number;
  name: string;
  city: string;
  country: string;
  iata: string;
  flights?: Flight[];
};

const airports: Airport[] = [
  {
    airportId: 3748,
    name: "Norman Y. Mineta San Jose International Airport",
    city: "San Jose",
    country: "United States",
    iata: "SJC",
  },

  {
    airportId: 3644,
    name: "Bob Hope Airport",
    city: "Burbank",
    country: "United States",
    iata: "BUR",
  },
  {
    airportId: 3797,
    name: "John F Kennedy International Airport",
    city: "New York",
    country: "United States",
    iata: "JFK",
  },
  {
    airportId: 3673,
    name: "Austin Bergstrom International Airport",
    city: "Austin",
    country: "United States",
    iata: "AUS",
  },
  {
    airportId: 3751,
    name: "Denver International Airport",
    city: "Denver",
    country: "United States",
    iata: "DEN",
  },
  {
    airportId: 3469,
    name: "San Francisco International Airport",
    city: "San Francisco",
    country: "United States",
    iata: "SFO",
  },
];

type Flight = {
  departureTime: string;
  arrivalTime: string;
  carrier: string;
  origin: string;
  destination: string;
};

const flights: Flight[] = [
  {
    departureTime: "2017-06-01T21:21:17.274Z",
    arrivalTime: "2017-06-01T22:21:17.274Z",
    carrier: "FR",
    origin: "SJC", // 1
    destination: "BUR", // 2
  },
  {
    departureTime: "2017-06-01T21:21:17.331Z",
    arrivalTime: "2017-06-02T09:21:17.331Z",
    carrier: "FR",
    origin: "BUR",
    destination: "AUS",
  },
  {
    departureTime: "2017-06-01T21:21:17.306Z",
    arrivalTime: "2017-06-02T03:21:17.306Z",
    carrier: "FR",
    origin: "BUR",
    destination: "DEN",
  },
  {
    departureTime: "2017-06-01T21:21:17.291Z",
    arrivalTime: "2017-06-02T14:21:17.291Z",
    carrier: "SW",
    origin: "DEN",
    destination: "AUS",
  },
];

function comparator(a: string, b: string) {
  return a === b;
}

const graph = new Graph<string>(comparator);

const nodes = airports.map((a) => ({
  name: a.iata,
  node: graph.addNode(a.iata),
}));

flights.forEach((f) => graph.addEdge(f.origin, f.destination, 1));

const node1 = nodes.find((n) => n.name === "SJC").node;

const node2 = nodes.find((n) => n.name === "AUS").node;

// JSC => AUS
console.log("BFS:");
const res = graph.breadthFirstSearchPath(node1, node2, 10);

console.log(res);
