import {
  generateDiagonalLinePoints,
  generateHorizontalLinePoints,
  generateVerticalLinePoints,
  inputToLine,
  isDiagonal,
} from "./index";

test("inputToLine", () => {
  expect(inputToLine("12,34 -> 56,78")).toStrictEqual([12, 34, 56, 78]);
});

test("isDiagonal", () => {
  expect(isDiagonal([9, 7, 7, 9])).toBe(true);
  expect(isDiagonal([7, 9, 9, 7])).toBe(true);
  expect(isDiagonal([6, 4, 2, 0])).toBe(true);
});

test("generateVerticalLinePoints", () => {
  expect(generateVerticalLinePoints([0, 0, 0, 2])).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(generateVerticalLinePoints([0, 2, 0, 0])).toStrictEqual([
    [0, 2],
    [0, 1],
    [0, 0],
  ]);
});

test("generateHorizontalLinePoints", () => {
  expect(generateHorizontalLinePoints([0, 0, 2, 0])).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  expect(generateHorizontalLinePoints([2, 0, 0, 0])).toStrictEqual([
    [2, 0],
    [1, 0],
    [0, 0],
  ]);
});

test("generateDiagonalLinePoints", () => {
  expect(generateDiagonalLinePoints([0, 0, 2, 2])).toStrictEqual([
    [0, 0],
    [1, 1],
    [2, 2],
  ]);
  expect(generateDiagonalLinePoints([0, 2, 2, 0])).toStrictEqual([
    [0, 2],
    [1, 1],
    [2, 0],
  ]);
  expect(generateDiagonalLinePoints([2, 0, 0, 2])).toStrictEqual([
    [2, 0],
    [1, 1],
    [0, 2],
  ]);
});
