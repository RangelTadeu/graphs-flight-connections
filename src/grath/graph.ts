import { Queue } from "../queue/queue";
import { GrathNode } from "./node";

export class Graph<T> {
  nodes: Map<T, GrathNode<T>> = new Map();
  edges: Map<T, Map<T, number>> = new Map();

  constructor(private comparator: (a: T, b: T) => boolean) {}

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

  addEdge(source: T, destination: T, weight = 0): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode, weight);

    if (!this.edges.has(source)) {
      this.edges.set(source, new Map());
    }

    this.edges.get(source)!.set(destination, weight);
  }

  breadthFirstSearchPath(
    source: GrathNode<T>,
    destination: GrathNode<T>,
    countRoutes = 1
  ): { path: T[]; weight: number }[] {
    const visited: Map<GrathNode<T>, boolean> = new Map();
    const paths: { path: T[]; weight: number }[] = [];
    const queue: Queue<{ node: GrathNode<T>; path: any[]; weight: number }> =
      new Queue();

    if (!source || !destination) {
      return paths;
    }

    queue.add({
      node: source,
      path: [source.data],
      weight: 0,
    });

    visited.set(source, true);

    while (!queue.isEmpty()) {
      const { node, path, weight } = queue.dequeue();

      if (node.data === destination.data) {
        paths.push({ path, weight });

        if (paths.length === countRoutes) return paths;
        continue;
      }

      for (const adjacentNode of node.adjacent) {
        if (!visited.has(adjacentNode) || adjacentNode === destination) {
          visited.set(adjacentNode, true);
          const edgeWeight = node.weights.get(adjacentNode) || 0;
          const newPath = [...path, adjacentNode.data];
          const newWeight = weight + edgeWeight;

          queue.add({ node: adjacentNode, path: newPath, weight: newWeight });
        }
      }
    }

    return paths;
  }
}
