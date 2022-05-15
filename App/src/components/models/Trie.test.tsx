import { TrieNode } from './Trie';

test('test case 1', () => {
  const defaultValue: string = '';

  const trieNode = new TrieNode({ val: defaultValue });

  expect(trieNode.getValue()).toBe(defaultValue);
});
