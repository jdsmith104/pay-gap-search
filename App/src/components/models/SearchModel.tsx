interface SearchResult {
  name: string;
  details: object;
}

interface ImportedData {
  data: Array<SearchResult>;
}

class SearchModel {
  searchItems: Array<SearchResult> = [
    { name: 'apple', details: {} },
    { name: 'ape', details: {} },
    { name: 'banana', details: {} },
    { name: 'babble', details: {} },
  ];

  // Expect { data: Array<SearchResult>}
  constructor(importedData: ImportedData) {
    this.searchItems = importedData.data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    );
  }

  // Search for string that begins with substring
  find(substring: string): Array<string> {
    const matches: Array<string> = [];
    let index = 0;
    while (matches.length < 3 && index < this.searchItems.length) {
      const item: string = this.searchItems[index].name;
      if (item.toLowerCase().startsWith(substring.toLowerCase())) {
        matches.push(item);
      }
      index += 1;
    }
    return matches;
  }
}

export { SearchModel };
export type { ImportedData };
