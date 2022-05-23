import { TrieNode } from './Trie';
import { SearchItem, ImportedData } from './SearchModelTypes';

export default class SearchModel {
  private searchItems: Array<SearchItem> = [];

  private trie: TrieNode;

  constructor(importedData: ImportedData) {
    this.trie = new TrieNode({ val: '' });
    for (let i = 0; i < importedData.data.length; i += 1) {
      const datum: SearchItem = importedData.data[i];
      this.trie.addItem(datum.name, datum);
    }
  }

  // Search for string that begins with substring
  find(substring: string): Array<SearchItem> {
    return this.trie.searchItem(substring);
  }
}
