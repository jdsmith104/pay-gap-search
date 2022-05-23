import React from 'react';
import { render } from '@testing-library/react';
import SuggestedSearchBar from './SuggestedSearchBar';

test('renders without crashing', () => {
  let newText: string = '';
  const { baseElement } = render(
    <SuggestedSearchBar
      onResultSelected={(text: string) => {
        newText = text;
      }}
    />,
  );
  expect(baseElement).toBeDefined();
  expect(newText).toBeDefined();
});
