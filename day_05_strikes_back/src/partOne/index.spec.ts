import {
  allLinePoints,
  convertInputToArray,
  isVerticalOrHorizontal,
  orderPoints,
  pointToString,
  range,
} from "./index";

test("convertInputToArray", () => {
  expect(convertInputToArray("123,456 -> 987,654")).toStrictEqual([
    123, 456, 987, 654,
  ]);
});

test("isVerticalOrHorizontal", () => {
  expect(isVerticalOrHorizontal([0, 0, 0, 1])).toBe(true);
  expect(isVerticalOrHorizontal([0, 0, 1, 0])).toBe(true);
  expect(isVerticalOrHorizontal([0, 1, 0, 0])).toBe(true);
  expect(isVerticalOrHorizontal([1, 0, 0, 0])).toBe(true);

  expect(isVerticalOrHorizontal([1, 0, 0, 1])).toBe(false);
  expect(isVerticalOrHorizontal([0, 1, 1, 0])).toBe(false);
});

test("orderPoints", () => {
  expect(orderPoints([0, 0, 1, 0])).toStrictEqual([0, 0, 1, 0]);
  expect(orderPoints([1, 0, 0, 0])).toStrictEqual([0, 0, 1, 0]);

  expect(orderPoints([0, 0, 0, 1])).toStrictEqual([0, 0, 0, 1]);
  expect(orderPoints([0, 1, 0, 0])).toStrictEqual([0, 0, 0, 1]);
});

test("range", () => {
  expect(range(0, 2)).toStrictEqual([0, 1, 2]);
});

test("allLinePoints", () => {
  expect(allLinePoints([0, 0, 2, 0])).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  expect(allLinePoints([0, 0, 0, 2])).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test("pointToString", () => {
  expect(pointToString([0, 0])).toBe("0:0");
});
