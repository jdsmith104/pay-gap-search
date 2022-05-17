import { assert } from 'console';

export interface ITrieParameters {
  val: string;
}

interface IResponse {
  success: boolean;
  val: any;
}
interface ISearchResponse {
  found: boolean;
  opts: any;
}

function toIndex(letter: string): IResponse {
  assert(letter.length === 1);
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

class TrieNode {
  children: Array<TrieNode | undefined>;

  val: string;

  options: any;

  constructor(parameters: ITrieParameters) {
    this.val = parameters.val;

    this.children = new Array<TrieNode | undefined>(26);

    this.options = undefined;
  }

  getValue(): string {
    return this.val;
  }

  addQuery(query: string, options: any): boolean {
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
        return this.children[index]?.addQuery(nextQuery, options);
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

  searchQuery(query: string): Array<any> {
    const parsedQuery = query.toLowerCase().replaceAll(' ', '');
    const response = this.search(parsedQuery);
    if (response) {
      // Success found a node
      const searchResults = Array<any>(0);
      if (response?.options) {
        searchResults.push(response.options);
      }
      return searchResults;
    }
    return [];
  }

  private search(query: string): TrieNode | undefined {
    if (query.length > 0) {
      const letter = query[0];
      const response = toIndex(letter);
      // If letter has been converted to valid index
      if (response.success === true) {
        const index = response.val;
        if (this.children[index] !== undefined) {
          return this.children[index]?.search(query.substring(1, query.length));
        }
        return undefined;
      }
      return undefined;
    }
    // Successful path
    return this;
  }
}

export { TrieNode, toIndex };
