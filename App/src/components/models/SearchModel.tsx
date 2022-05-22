import { TrieNode } from './Trie';
import { SearchItem, ImportedData } from './SearchModelTypes';

export default class SearchModel {
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
    return this.trie.searchItem(substring);
  }
}
