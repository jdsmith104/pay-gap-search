import { sha1 } from 'object-hash';
import Stack from './Stack';
import { SearchItem, IResponse, ITrieParameters } from './SearchModelTypes';

export const emptySearchResult: SearchItem = {
  name: '',
  details: [],
};

// Get the index of a supported character
function charToIndex(char: string): IResponse {
  const response: IResponse = { success: false, val: 0 };
  const index = char.toLowerCase().charCodeAt(0) - 97;
  response.val = index;
  if (index < 0 || index >= 26) {
    response.success = false;
  } else {
    response.success = true;
  }
  return response;
}

// Do a depth first search from head and return an array containing upto targetResultsCount
function depthFirstSearch(
  head: TrieNode,
  numItemsToFind: number,
): Array<SearchItem> {
  // Add node to stack to show unvisited
  // 100 chosen as a reasonable minimum stack size
  const stack = new Stack(100);
  const hashedVisitedNodes: string[] = [];
  const itemsFound: Array<SearchItem> = [];
  // Add head stack
  stack.push(head);
  while (!stack.empty() && itemsFound.length < numItemsToFind) {
    const node: TrieNode = stack.pop();
    if (node.options) {
      itemsFound.push(node.options);
    }
    const hash: string = sha1(node);
    if (!(hash in hashedVisitedNodes)) {
      hashedVisitedNodes.push(hash);
      for (let index = 25; index >= 0; index -= 1) {
        const child = node.children[index];
        if (child) {
          stack.push(child);
        }
      }
    }
  }
  return itemsFound;
}

class TrieNode {
  children: Array<TrieNode | undefined>;

  val: string;

  options: any;

  private searchQueryMaxResults: number = 3;

  private minQueryLength: number = 1;

  private cachedSearchResults: Map<string, [Array<SearchItem>, TrieNode]>;

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
      const response = charToIndex(letter);
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

  searchItem(query: string): Array<SearchItem> {
    const parsedQuery = query.toLowerCase().replaceAll(' ', '');
    let result: Array<SearchItem> = [];
    if (!this.isValidSearchTerm(query)) {
      result = [];
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
        const searchResults: Array<SearchItem> = depthFirstSearch(
          head,
          this.searchQueryMaxResults,
        );
        this.cachedSearchResults.set(parsedQuery, [searchResults, head]);
        result = searchResults;
      }
    }

    while (result.length < this.searchQueryMaxResults) {
      result.push(emptySearchResult);
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
    if (query.length < this.minQueryLength) {
      isValid = false;
    }
    return isValid;
  }

  private getSubNode(query: string): TrieNode | undefined {
    if (query.length > 0) {
      const letter = query[0];
      const response = charToIndex(letter);
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

export { TrieNode, charToIndex as toIndex, depthFirstSearch };
