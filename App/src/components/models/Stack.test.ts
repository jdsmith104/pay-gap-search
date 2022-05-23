import Stack from './Stack';

test('test push adds element', () => {
  const stack = new Stack(5);
  const inputs = [1, 2, 3, 4, 5];
  inputs.forEach((element) => {
    stack.push(element);
  });

  expect(stack.size()).toBe(inputs.length);
});

test('test cannot push more elements than expected', () => {
  const stack = new Stack(5);
  const inputs = [1, 2, 3, 4, 5];
  inputs.forEach((element) => {
    stack.push(element);
  });

  expect(stack.size()).toBe(inputs.length);

  stack.push(7);

  expect(stack.size()).toBe(inputs.length);
});

test('test pop removes last element', () => {
  const stack = new Stack(5);
  const inputs = [1, 2, 3, 4, 5];
  inputs.forEach((element) => {
    stack.push(element);
  });

  expect(stack.pop()).toBe(inputs.at(-1));
  expect(stack.pop()).toBe(inputs.at(-2));

  expect(stack.size()).toBe(inputs.length - 2);
});

test('test front gets last element', () => {
  const stack = new Stack(5);
  const inputs = [1, 2, 3, 4, 5];
  inputs.forEach((element) => {
    stack.push(element);
  });

  expect(stack.front()).toBe(inputs.at(-1));

  expect(stack.size()).toBe(inputs.length);
});
