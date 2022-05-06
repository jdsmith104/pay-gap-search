interface SearchResult {
  name: string;

  details: object;
}

interface ImportedData {
  data: Array<SearchResult>;
}

class SearchModel {
  items: Array<SearchResult> = [
    { name: 'apple', details: {} },
    { name: 'ape', details: {} },
    { name: 'banana', details: {} },
    { name: 'babble', details: {} },
  ];

  // Expect { data: Array<SearchResult>}
  constructor(importedData: ImportedData) {
    this.items = importedData.data;
  }

  find(substring: string): Array<string> {
    const matches: Array<string> = [];
    let index = 0;
    while (matches.length < 3 && index < this.items.length) {
      const item: string = this.items[index].name;
      if (item.startsWith(substring)) {
        matches.push(item);
      }
      index += 1;
    }
    return matches;
  }
}

export { SearchModel };
export type { ImportedData };
