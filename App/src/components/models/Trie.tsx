export interface TrieParameters {
  val: string;
}

class TrieNode {
  children: Array<TrieNode | undefined>;

  val: string;

  constructor(parameters: TrieParameters) {
    this.val = parameters.val;

    this.children = new Array<TrieNode | undefined>(26);
  }

  getValue(): string {
    return this.val;
  }
}

export { TrieNode };
