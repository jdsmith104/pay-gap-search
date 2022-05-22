import fs from 'fs';
import { ImportedData } from './SearchModelTypes';
import SearchModel from './SearchModel';

test('finds results 1', () => {
  const importedData = {
    data: [
      { name: 'apple', details: [] },
      { name: 'ape', details: [] },
      { name: 'banana', details: [] },
      { name: 'babble', details: [] },
    ],
  };
  const model = new SearchModel(importedData);

  expect(model.find('a')).toHaveLength(2);
  expect(model.find('ba')).toHaveLength(2);
});

test('finds results with different cases', () => {
  const importedData = {
    data: [
      { name: 'apple', details: [] },
      { name: 'ape', details: [] },
      { name: 'Apex', details: [] },
      { name: 'banana', details: [] },
      { name: 'babble', details: [] },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('a');

  expect(result).toHaveLength(3);
});

test('finds returns first three results in order', () => {
  const importedData = {
    data: [
      { name: 'apple', details: [] },
      { name: 'axe', details: [] },
      { name: 'Ape', details: [] },
      { name: 'banana', details: [] },
      { name: 'babble', details: [] },
      { name: 'aaron', details: [] },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('a');
  expect(result[0].name).toBe('aaron');
  expect(result[1].name).toBe('Ape');
  expect(result[2].name).toBe('apple');
});

test('returns empty array when no results found', () => {
  const importedData = {
    data: [
      { name: 'apple', details: [] },
      { name: 'axe', details: [] },
      { name: 'Ape', details: [] },
      { name: 'banana', details: [] },
      { name: 'babble', details: [] },
      { name: 'aaron', details: [] },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('x');
  expect(result).toHaveLength(0);
});

test('ignores whitespace in search', () => {
  const importedData = {
    data: [
      { name: 'xenon', details: [] },
      { name: 'axe', details: [] },
      { name: 'Ape', details: [] },
      { name: 'banana', details: [] },
      { name: 'babble', details: [] },
      { name: 'aaron', details: [] },
    ],
  };
  const model = new SearchModel(importedData);
  const result = model.find('x    ');
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('xenon');
});

test('test expect cached results to be found faster', () => {
  try {
    // Get JSON file
    const path = `${__dirname}/../../../public/data/json_data.json`;
    const response = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    const objectData: ImportedData = JSON.parse(response);
    const searchModel = new SearchModel(objectData);

    // Measure the time taken to find a query
    let startTime = performance.now();
    let results = searchModel.find('micro');
    let endTime = performance.now();
    const firstSearchTime = endTime - startTime;

    expect(results).toBeDefined();
    // Repeat query. Measure the time taken to find a query
    startTime = performance.now();
    results = searchModel.find('micro');
    endTime = performance.now();
    const secondSearchTime = endTime - startTime;
    expect(secondSearchTime).toBeLessThan(firstSearchTime);
  } catch (error) {
    fail('Data parsing has been unsuccessful');
  }
});
