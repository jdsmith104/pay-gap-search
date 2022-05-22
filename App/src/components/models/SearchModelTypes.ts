export interface SearchItem {
  name: string;
  details: Array<string>;
}

export interface ImportedData {
  data: Array<SearchItem>;
}

export interface ITrieParameters {
  val: string;
}

export interface IResponse {
  success: boolean;
  val: any;
}
