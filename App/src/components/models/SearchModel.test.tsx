import { SearchModel } from './SearchModel';

test('renders without crashing', () => {
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
