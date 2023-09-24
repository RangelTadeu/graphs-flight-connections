export class GrathNode<T> {
  adjacent: GrathNode<T>[];
  weights: Map<GrathNode<T>, number>;

  constructor(public data: T, private comparator: (a: T, b: T) => boolean) {
    this.adjacent = [];
    this.weights = new Map();
  }

  addAdjacent(node: GrathNode<T>, weight: number): void {
    this.adjacent.push(node);
    this.weights.set(node, weight);
  }

  removeAdjacent(data: T): GrathNode<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === true
    );

    if (index > -1) {
      const removed = this.adjacent.splice(index, 1)[0];
      this.weights.delete(removed);
      return removed;
    }

    return null;
  }
}
