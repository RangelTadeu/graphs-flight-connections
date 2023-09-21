import { Queue } from "../queue/queue";
import { GrathNode } from "./node";

export class Graph<T> {
  nodes: Map<T, GrathNode<T>> = new Map();
  comparator: (a: T, b: T) => boolean;
  flights: { [key: string]: string }[];

  constructor(
    comparator: (a: T, b: T) => boolean,
    flights: { [key: string]: string }[]
  ) {
    this.comparator = comparator;
    this.flights = flights;
  }

  addNode(data: T): GrathNode<T> {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new GrathNode(data, this.comparator);
    this.nodes.set(data, node);

    return node;
  }

  removeNode(data: T): GrathNode<T> | null {
    const nodeToRemove = this.nodes.get(data);

    if (!nodeToRemove) return null;

    this.nodes.forEach((node) => {
      node.removeAdjacent(nodeToRemove.data);
    });

    this.nodes.delete(data);

    return nodeToRemove;
  }

  addEdge(source: T, destination: T): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode);
  }

  removeEdge(source: T, destination: T): void {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destination);
    }
  }

  /**
   * Depth-first search
   *
   * @param {T} data
   * @param {Map<T, boolean>} visited
   * @returns
   */
  private depthFirstSearchAux(
    node: GrathNode<T>,
    visited: Map<T, boolean>
  ): void {
    if (!node) return;

    visited.set(node.data, true);

    console.log(node.data);

    node.adjacent.forEach((item) => {
      if (!visited.has(item.data)) {
        this.depthFirstSearchAux(item, visited);
      }
    });
  }

  depthFirstSearch() {
    const visited: Map<T, boolean> = new Map();
    this.nodes.forEach((node) => {
      if (!visited.has(node.data)) {
        this.depthFirstSearchAux(node, visited);
      }
    });
  }

  private breadthFirstSearchPathAux(
    source: GrathNode<T>,
    destination: GrathNode<T>,
    visited: Map<T, boolean>
  ): void {
    const queue: Queue<GrathNode<T>> = new Queue();
    const pathMap: Map<T, T | null> = new Map();

    if (!source) return;

    queue.add(source);
    visited.set(source.data, true);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();

      if (currentNode.data === destination.data) {
        //caminho encontrado

        const path: T[] = [];
        let current = destination.data;
        while (current !== source.data) {
          // procurar voo

          path.unshift(current);
          current = pathMap.get(current)!;
        }
        path.unshift(source.data);

        const res = [];

        path.reduce((prev, cur) => {
          const flight = this.flights.filter(
            (f) => f.origin === prev && f.destination === cur
          );

          if (flight?.length > 0) res.push(flight);

          return cur;
        });

        console.log("Caminho encontrado:", path.join(" -> "));
        return;
      }

      currentNode.adjacent.forEach((item) => {
        if (!visited.has(item.data)) {
          visited.set(item.data, true);
          queue.add(item);
          pathMap.set(item.data, currentNode.data); // Para reconstruir o caminho
        }
      });
    }
  }

  breadthFirstSearchPath(source: GrathNode<T>, destination: GrathNode<T>) {
    const visited: Map<T, boolean> = new Map();

    this.breadthFirstSearchPathAux(source, destination, visited);
  }
}
