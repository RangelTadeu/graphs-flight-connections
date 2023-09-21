export class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

export class Queue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  add(item: T): void {
    const newItem = new Node(item);

    if (!this.head) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      if (this.tail) {
        this.tail.next = newItem;
        this.tail = newItem;
      }
    }

    this.size++;
  }

  dequeue(): T | null {
    if (!this.head) {
      return null;
    }

    const removed = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return removed;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  peek(): T | null {
    if (this.head) {
      return this.head.data;
    }
    return null;
  }
}
