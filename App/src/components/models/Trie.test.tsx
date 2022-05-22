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
    { name: 'apple', details: [] },
    { name: 'ape', details: [] },
    { name: 'Ape', details: [] },
  ];

  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    head.addItem(element.name, element);
  }

  const searchResponse = head.searchItem('a');
  expect(searchResponse).toHaveLength(2);
});
