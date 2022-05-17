import { toIndex, TrieNode } from './Trie';

test('test case 1', () => {
  const defaultValue: string = '';

  const trieNode = new TrieNode({ val: defaultValue });

  expect(trieNode.getValue()).toBe(defaultValue);
});

test('test case 2', () => {
  const defaultValue: string = '';

  const head = new TrieNode({ val: defaultValue });

  expect(head.getValue()).toBe(defaultValue);
});

test('test case 3', () => {
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

test('test toIndex', () => {
  const letters = ['A', 'a', 'b', ','];
  const expectedIndex = [true, true, true, false];
  for (let i = 0; i < letters.length; i += 1) {
    const response: any = toIndex(letters[i]);
    expect(response?.success).toBe(expectedIndex[i]);
  }
});
