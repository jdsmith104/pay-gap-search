import { sha1 } from 'object-hash';
import Stack from './Stack';

export interface ITrieParameters {
  val: string;
}

interface IResponse {
  success: boolean;
  val: any;
}

function toIndex(letter: string): IResponse {
  const response: IResponse = { success: false, val: 0 };
  const index = letter.toLowerCase().charCodeAt(0) - 97;
  response.val = index;
  if (index < 0 || index >= 26) {
    response.success = false;
  } else {
    response.success = true;
  }
  return response;
}

function depthFirstSearch(
  head: TrieNode,
  targetResultsCount: number,
): Array<object> {
  // Add node to stack to show unvisited
  const stack = new Stack(100);
  const visitedNodes: string[] = [];
  const results: Array<object> = [];
  // Add head stack
  stack.push(head);
  while (!stack.empty() && results.length < targetResultsCount) {
    const node: TrieNode = stack.pop();
    if (node.options) {
      results.push(node.options);
    }
    const hash: string = sha1(node);
    if (!(hash in visitedNodes)) {
      visitedNodes.push(hash);
      for (let index = 25; index >= 0; index -= 1) {
        const child = node.children[index];
        if (child) {
          stack.push(child);
        }
      }
    }
  }
  return results;
}

class TrieNode {
  children: Array<TrieNode | undefined>;

  val: string;

  options: any;

  private static searchQueryMaxResults: number = 3;

  private minSearchLength: number = 1;

  private cachedSearchResults: Map<string, [Array<object>, TrieNode]>;

  constructor(parameters: ITrieParameters) {
    this.val = parameters.val;

    this.children = new Array<TrieNode | undefined>(26);

    this.options = undefined;

    this.cachedSearchResults = new Map();
  }

  getValue(): string {
    return this.val;
  }

  addItem(query: string, options: {}): boolean {
    const parsedQuery = query.toLowerCase().replaceAll(' ', '');
    const response = this.add(parsedQuery, options);
    if (response) {
      return true;
    }
    return false;
  }

  private add(query: string, options: any): undefined | boolean {
    if (query.length > 0) {
      const letter = query[0];
      const response = toIndex(letter);
      // If letter has been converted to valid index
      if (response.success === true) {
        const index = response.val;
        if (this.children[index] === undefined) {
          this.children[index] = new TrieNode({ val: letter });
        }
        const nextQuery: string = query.substring(1, query.length);
        return this.children[index]?.addItem(nextQuery, options);
      }
      return false;
    }

    // Return false if query already in structure
    if (this.options) {
      return false;
    }

    this.options = options;
    return true;
  }

  searchItem(query: string): Array<object> | undefined {
    const parsedQuery = query.toLowerCase().replaceAll(' ', '');
    let result: Array<object> | undefined;
    if (!this.isValidSearchTerm(query)) {
      result = undefined;
    } else if (this.cachedSearchResults.has(parsedQuery)) {
      const queryTuple = this.cachedSearchResults.get(parsedQuery);
      if (queryTuple) {
        [result] = queryTuple;
      }
    } else {
      // head or undefined
      const [cachedHead, subQuery] = this.isHeadCached(parsedQuery);
      const head: TrieNode | undefined = cachedHead.getSubNode(subQuery);
      if (head) {
        // Success found a node
        const searchResults: Array<object> = depthFirstSearch(
          head,
          TrieNode.searchQueryMaxResults,
        );
        this.cachedSearchResults.set(parsedQuery, [searchResults, head]);
        result = searchResults;
      }
    }

    return result;
  }

  private isHeadCached(query: string): [TrieNode, string] {
    let returnHead: TrieNode = this;
    let remainingQuery: string = query;
    if (query.length > 1) {
      for (let i = 1; i < query.length; i += 1) {
        // Look for cached substring
        const reducedString: string = query.substring(0, query.length - i);
        if (this.cachedSearchResults.has(reducedString)) {
          const cachedResultGet: any = this.cachedSearchResults.get(reducedString);
          if (cachedResultGet) {
            const cachedResult: [Array<object>, TrieNode] = cachedResultGet;
            const remainingQueryStartIndex: number = query.length - i;
            remainingQuery = query.substring(remainingQueryStartIndex, query.length);
            [, returnHead] = cachedResult;
            break;
          }
        }
      }
    }
    return [returnHead, remainingQuery];
  }

  private isValidSearchTerm(query: string): boolean {
    let isValid = true;
    if (query.length < this.minSearchLength) {
      isValid = false;
    }
    return isValid;
  }

  private getSubNode(query: string): TrieNode | undefined {
    if (query.length > 0) {
      const letter = query[0];
      const response = toIndex(letter);
      // If letter has been converted to valid index
      if (response.success === true) {
        const index = response.val;
        if (this.children[index] !== undefined) {
          return this.children[index]?.getSubNode(query.substring(1, query.length));
        }
        return undefined;
      }
      return undefined;
    }
    // Successful path
    return this;
  }
}

export { TrieNode, toIndex, depthFirstSearch };
