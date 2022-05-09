import { SearchModel } from './SearchModel';

test('finds results 1', () => {
  const importedData = {
    data: [
      { name: 'apple', details: {} },
      { name: 'ape', details: {} },
      { name: 'banana', details: {} },
      { name: 'babble', details: {} },
    ],
  };
  const model = new SearchModel(importedData);

  expect(model.find('a')).toHaveLength(2);
  expect(model.find('ba')).toHaveLength(2);
});

test('finds results with different cases', () => {
  const importedData = {
    data: [
      { name: 'apple', details: {} },
      { name: 'ape', details: {} },
      { name: 'Ape', details: {} },
      { name: 'banana', details: {} },
      { name: 'babble', details: {} },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('a');

  expect(result).toHaveLength(3);
});

test('finds returns first three results in order', () => {
  const importedData = {
    data: [
      { name: 'apple', details: {} },
      { name: 'axe', details: {} },
      { name: 'Ape', details: {} },
      { name: 'banana', details: {} },
      { name: 'babble', details: {} },
      { name: 'aaron', details: {} },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('a');
  expect(result[0]).toBe('aaron');
  expect(result[1]).toBe('Ape');
  expect(result[2]).toBe('apple');
});

test('returns empty array when no results found', () => {
  const importedData = {
    data: [
      { name: 'apple', details: {} },
      { name: 'axe', details: {} },
      { name: 'Ape', details: {} },
      { name: 'banana', details: {} },
      { name: 'babble', details: {} },
      { name: 'aaron', details: {} },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('x');
  expect(result).toHaveLength(0);
});

test('ignores whitespace in search', () => {
  const importedData = {
    data: [
      { name: 'xenon', details: {} },
      { name: 'axe', details: {} },
      { name: 'Ape', details: {} },
      { name: 'banana', details: {} },
      { name: 'babble', details: {} },
      { name: 'aaron', details: {} },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('x    ');
  expect(result).toHaveLength(1);
  expect(result[0]).toBe('xenon');
});
