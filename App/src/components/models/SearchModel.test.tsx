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
});
