import { TrieNode } from './Trie';

interface SearchItem {
  name: string;
  details: Array<string>;
}

interface ImportedData {
  data: Array<SearchItem>;
}

class SearchModel {
  private searchItems: Array<SearchItem> = [];

  private trie: TrieNode;

  // Expect { data: Array<SearchResult>}
  constructor(importedData: ImportedData) {
    this.trie = new TrieNode({ val: 'a' });
    if (importedData.data !== undefined && importedData.data.length > 0) {
      for (let i = 0; i < importedData.data.length; i += 1) {
        const item: SearchItem = importedData.data[i];
        this.trie.addItem(item.name, item);
      }
    }
  }

  // Search for string that begins with substring
  find(substring: string): Array<SearchItem> {
    const matches: Array<SearchItem> = [];
    const response = this.trie.searchItem(substring);
    if (response && response?.length > 0) {
      for (let index = 0; index < response.length; index += 1) {
        const searchItem: SearchItem = response[index] as SearchItem;
        matches.push(searchItem);
      }
    }
    return matches;
  }
}

export { SearchModel };
export type { ImportedData, SearchItem as SearchResult };
