import { readTestFile } from '../utils';
import {
  convertInputToArray,
  generateAllPoints,
  smallestPointFirst,
} from './index';

test('convertInputToArray', async () => {
  const lines = await readTestFile();

  expect(convertInputToArray('0,9 -> 5,9')).toStrictEqual([0, 9, 5, 9]);
  expect(convertInputToArray(undefined as unknown as string)).toStrictEqual([]);
});

test('smallestPointFirst', () => {
  expect(smallestPointFirst([1, 0, 0, 0])).toStrictEqual([0, 0, 1, 0]);
  expect(smallestPointFirst([0, 1, 0, 0])).toStrictEqual([0, 0, 0, 1]);

  expect(smallestPointFirst([0, 0, 1, 0])).toStrictEqual([0, 0, 1, 0]);
  expect(smallestPointFirst([0, 0, 0, 1])).toStrictEqual([0, 0, 0, 1]);
});

test('generateAllPoints', () => {
  expect(generateAllPoints([0, 0, 2, 0])).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  expect(generateAllPoints([0, 0, 0, 2])).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});
