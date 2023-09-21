export class GrathNode<T> {
  data: T;
  adjacent: GrathNode<T>[];
  comparator: (a: T, b: T) => boolean;

  constructor(data: T, comparator: (a: T, b: T) => boolean) {
    this.data = data;
    this.adjacent = [];
    this.comparator = comparator;
  }

  addAdjacent(node: GrathNode<T>): void {
    this.adjacent.push(node);
  }

  removeAdjacent(data: T): GrathNode<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === true
    );

    if (index > -1) {
      return this.adjacent.splice(index, 1)[0];
    }

    return null;
  }
}
