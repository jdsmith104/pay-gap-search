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
  let response: boolean = head.addQuery('hello', opts);
  expect(response).toBe(true);

  response = head.addQuery('help', opts);
  expect(response).toBe(true);

  response = head.addQuery('help me', opts);
  expect(response).toBe(true);

  response = head.addQuery('help me', opts);
  expect(response).toBe(false);
});

test('test search', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const opts = { name: 'test' };
  let response: boolean = head.addQuery('hello', opts);
  expect(response).toBe(true);

  response = head.addQuery('abcd', opts);
  expect(response).toBe(true);

  response = head.addQuery('abc', opts);
  expect(response).toBe(true);

  response = head.addQuery('abcde', opts);
  expect(response).toBe(true);

  const searchResponse = head.searchQuery('abc');
  expect(searchResponse).toHaveLength(3);
  expect(searchResponse[0]).toBe(opts);
  expect(searchResponse[1]).toBe(opts);
  expect(searchResponse[2]).toBe(opts);
});

test('test depth first search', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });
  const opts = { name: 'test' };
  let response: boolean = head.addQuery('hello', opts);
  expect(response).toBe(true);

  response = head.addQuery('abcd', opts);
  expect(response).toBe(true);

  response = head.addQuery('abc', opts);
  expect(response).toBe(true);

  response = head.addQuery('abcde', opts);
  expect(response).toBe(true);

  const searchResponse: TrieNode[] = depthFirstSearch(head, 3);
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
