class Stack {
  private count: number;

  private maxSize: number;

  private items: any[] = [];

  constructor(maxSize: number) {
    this.count = 0;
    this.maxSize = maxSize;
  }

  push(item: any): boolean {
    let itemAdded: boolean = false;
    if (this.count < this.maxSize) {
      this.items.push(item);
      this.count += 1;
      itemAdded = true;
    }

    return itemAdded;
  }

  pop(): any {
    let poppedItem: any;
    if (this.items.length > 0) {
      poppedItem = this.items.pop();
      this.count -= 1;
    }
    return poppedItem;
  }

  front(): any {
    let frontItem: any;
    if (this.items.length > 0) {
      frontItem = this.items.at(-1);
    }
    return frontItem;
  }

  size(): number {
    return this.count;
  }
}

export default Stack;
