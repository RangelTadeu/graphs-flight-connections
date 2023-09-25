export class FlightGrathNode<T> {
  adjacent: FlightGrathNode<T>[];
  distance: Map<FlightGrathNode<T>, number>;
  departures: Map<FlightGrathNode<T>, string[]>;

  constructor(public data: T, private comparator: (a: T, b: T) => boolean) {
    this.adjacent = [];
    this.distance = new Map();
    this.departures = new Map();
  }

  addAdjacent(node: FlightGrathNode<T>, weight: number, departureTime): void {
    if (!this.adjacent.find((n) => n.data === node.data)) {
      this.adjacent.push(node);
    }

    this.distance.set(node, weight);

    const departures = this.departures.get(node);

    if (departures?.length > 0) {
      this.departures.set(node, [...departures, departureTime]);
    } else {
      this.departures.set(node, [departureTime]);
    }
  }

  removeAdjacent(data: T): FlightGrathNode<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === true
    );

    if (index > -1) {
      const removed = this.adjacent.splice(index, 1)[0];
      this.distance.delete(removed);
      this.departures.delete(removed);
      return removed;
    }

    return null;
  }
}
