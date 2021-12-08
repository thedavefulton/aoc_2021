import {
  allLinePoints,
  diagonalPoints,
  isDiagonal,
  rangeWithReverse,
} from "./index";

test("rangeWithReverse", () => {
  expect(rangeWithReverse(0, 2)).toStrictEqual([0, 1, 2]);
  expect(rangeWithReverse(2, 0)).toStrictEqual([2, 1, 0]);
});

test("isDiagonal", () => {
  expect(isDiagonal([1, 0, 0, 1])).toBe(true);
  expect(isDiagonal([1, 1, 0, 1])).toBe(false);
});

test("diagonalPoints", () => {
  expect(diagonalPoints([0, 2, 2, 0])).toStrictEqual([
    [0, 2],
    [1, 1],
    [2, 0],
  ]);
});

test("allLinePoints", () => {
  expect(allLinePoints([0, 2, 2, 0])).toStrictEqual([
    [0, 2],
    [1, 1],
    [2, 0],
  ]);
  expect(allLinePoints([2, 0, 0, 2])).toStrictEqual([
    [2, 0],
    [1, 1],
    [0, 2],
  ]);
  expect(allLinePoints([0, 2, 0, 0])).toStrictEqual([
    [0, 2],
    [0, 1],
    [0, 0],
  ]);
  expect(allLinePoints([2, 0, 0, 0])).toStrictEqual([
    [2, 0],
    [1, 0],
    [0, 0],
  ]);
  expect(allLinePoints([0, 0, 0, 2])).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(allLinePoints([0, 0, 2, 0])).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});
