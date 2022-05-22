import { depthFirstSearch, toIndex, TrieNode } from './Trie';

test('test constructor', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });

  expect(head.getValue()).toBe(defaultValue);
});

test('test add query', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const opts = { name: 'test' };
  let response: boolean = head.addItem('hello', opts);
  expect(response).toBe(true);

  response = head.addItem('help', opts);
  expect(response).toBe(true);

  response = head.addItem('help me', opts);
  expect(response).toBe(true);

  response = head.addItem('help me', opts);
  expect(response).toBe(false);
});

test('test search', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const opts = { name: 'test' };
  let response: boolean = head.addItem('hello', opts);
  expect(response).toBe(true);

  response = head.addItem('abcd', opts);
  expect(response).toBe(true);

  response = head.addItem('abc', opts);
  expect(response).toBe(true);

  response = head.addItem('abcde', opts);
  expect(response).toBe(true);

  const searchResponse = head.searchItem('abc');
  expect(searchResponse).toHaveLength(3);
  if (searchResponse) {
    expect(searchResponse[0]).toBe(opts);
    expect(searchResponse[1]).toBe(opts);
    expect(searchResponse[2]).toBe(opts);
  }
});

test('test depth first search', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const opts = { name: 'test' };
  let response: boolean = head.addItem('hello', opts);
  expect(response).toBe(true);

  response = head.addItem('abcd', opts);
  expect(response).toBe(true);

  response = head.addItem('abc', opts);
  expect(response).toBe(true);

  response = head.addItem('abcde', opts);
  expect(response).toBe(true);

  const searchResponse: object[] = depthFirstSearch(head, 3);
  expect(searchResponse).toHaveLength(3);
});

test('test toIndex', () => {
  const letters = ['A', 'a', 'b', ','];
  const expectedIndex = [true, true, true, false];
  for (let i = 0; i < letters.length; i += 1) {
    const response: any = toIndex(letters[i]);
    expect(response?.success).toBe(expectedIndex[i]);
  }
});

test('does not allow duplicates', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const data = [
    { name: 'ape', details: [] },
    { name: 'Ape', details: [] },
  ];

  const [datum1, datum2] = data;
  expect(head.addItem(datum1.name, datum1)).toBeTruthy();
  expect(head.addItem(datum2.name, datum2)).toBeFalsy();
});

test('previous search results are cached', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const data = [
    { name: 'apple', details: [] },
    { name: 'ape', details: [] },
    { name: 'Apel', details: [] },
    { name: 'Apae', details: [] },
    { name: 'Abaie', details: [] },
    { name: 'bone', details: [] },
  ];

  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    head.addItem(element.name, element);
  }

  // Measure the time taken to find a query
  let startTime = performance.now();
  const firstSearchResponse = head.searchItem('a');
  let endTime = performance.now();
  const firstSearchTime = endTime - startTime;

  startTime = performance.now();
  const secondSearchResponse = head.searchItem('a');
  endTime = performance.now();
  const secondSearchTime = endTime - startTime;
  if (firstSearchResponse && secondSearchResponse) {
    expect(firstSearchResponse).toMatchObject(secondSearchResponse);
  } else {
    fail('Expected search results to be returned');
  }
  expect(secondSearchTime).toBeLessThan(firstSearchTime);
});

test('Building a search query', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const data = [
    { name: 'able', details: [] },
    { name: 'Apae', details: [] },
    { name: 'ape', details: [] },
    { name: 'Apel', details: [] },
    { name: 'apple', details: [] },
  ];

  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    head.addItem(element.name, element);
  }

  // Measure the time taken to find a query
  let searchResponse = head.searchItem('a');
  expect(searchResponse[0]).toBe(data[0]);
  expect(searchResponse[1]).toBe(data[1]);
  expect(searchResponse[2]).toBe(data[2]);

  searchResponse = head.searchItem('ap');
  expect(searchResponse[0]).toBe(data[1]);
  expect(searchResponse[1]).toBe(data[2]);
  expect(searchResponse[2]).toBe(data[3]);

  searchResponse = head.searchItem('ape');
  expect(searchResponse[0]).toBe(data[2]);
  expect(searchResponse[1]).toBe(data[3]);
});
