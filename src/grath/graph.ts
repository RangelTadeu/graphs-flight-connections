import { Queue } from "../queue/queue";
import { FlightGrathNode } from "./node";

export class FlightGraph<T> {
  nodes: Map<T, FlightGrathNode<T>> = new Map();
  edges: Map<T, Map<T, number>> = new Map();

  constructor(private comparator: (a: T, b: T) => boolean) {}

  addNode(data: T): FlightGrathNode<T> {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new FlightGrathNode(data, this.comparator);
    this.nodes.set(data, node);

    return node;
  }

  removeNode(data: T): FlightGrathNode<T> | null {
    const nodeToRemove = this.nodes.get(data);

    if (!nodeToRemove) return null;

    this.nodes.forEach((node) => {
      node.removeAdjacent(nodeToRemove.data);
    });

    this.nodes.delete(data);

    return nodeToRemove;
  }

  addEdge(source: T, destination: T, distance = 0, departure: string): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode, distance, departure);

    if (!this.edges.has(source)) {
      this.edges.set(source, new Map());
    }

    this.edges.get(source)!.set(destination, distance);
  }

  breadthFirstSearchPath(
    source: FlightGrathNode<T>,
    destination: FlightGrathNode<T>,
    countRoutes = 1
  ): { path: T[]; routes: T[]; distance: number }[] {
    const visited: Map<FlightGrathNode<T>, boolean> = new Map();
    const paths: { path: T[]; routes: any[]; distance: number }[] = [];
    const queue: Queue<{
      node: FlightGrathNode<T>;
      path: any[];
      routes: any[];
      distance: number;
    }> = new Queue();

    if (!source || !destination) {
      return paths;
    }

    queue.add({
      node: source,
      path: [source.data],
      routes: [],
      distance: 0,
    });

    visited.set(source, true);

    while (!queue.isEmpty()) {
      const { node, path, distance, routes } = queue.dequeue();

      if (node.data === destination.data) {
        paths.push({ path, distance, routes });

        if (paths.length === countRoutes) return paths;
        continue;
      }

      for (const adjacentNode of node.adjacent) {
        if (!visited.has(adjacentNode) || adjacentNode === destination) {
          visited.set(adjacentNode, true);
          const edgeDistance = node.distance.get(adjacentNode) || 0;
          const edgeDeparture = node.departures.get(adjacentNode);
          const newPath = [...path, adjacentNode.data];

          const newDistance = distance + edgeDistance;

          const newRoutes = [
            ...routes,
            {
              name: `${node.data}->${adjacentNode.data}`,
              departures: edgeDeparture,
            },
          ];

          queue.add({
            node: adjacentNode,
            path: newPath,
            routes: newRoutes,
            distance: newDistance,
          });
        }
      }
    }

    return paths;
  }
}
