import { readFile, readTestFile, shout } from "../utils";
import {
  convertInputToArray,
  isVerticalOrHorizontal,
  pointToString,
  range,
} from "../partOne";
const _reverse = require("lodash/reverse");
const _zip = require("lodash/zip");

export function rangeWithReverse(start: number, end: number) {
  if (end > start) {
    return range(start, end);
  } else {
    return range(end, start).reverse();
  }
}

export function isDiagonal([x1, y1, x2, y2]: number[]) {
  return (x1 === y2 && y1 === x2) || (x1 === y1 && x2 === y2);
}

export function diagonalPoints([x1, y1, x2, y2]: number[]): number[][] {
  return _zip(rangeWithReverse(x1, x2), rangeWithReverse(y1, y2));
}

export function normalPoints([x1, y1, x2, y2]: number[]): number[][] {
  return x1 === x2
    ? rangeWithReverse(y1, y2).map((y) => [x1, y])
    : rangeWithReverse(x1, x2).map((x) => [x, y1]);
}

export function allLinePoints(line: number[]): number[][] {
  return isDiagonal(line) ? diagonalPoints(line) : normalPoints(line);
}

export function isVerticalOrHorizontalOrDiagonal(arr: number[]) {
  // console.log(arr);
  return isVerticalOrHorizontal(arr) || isDiagonal(arr);
}

export const partTwoShout = async () => {
  const lines = await readTestFile();

  const points = lines
    .map(convertInputToArray)
    .filter(isVerticalOrHorizontalOrDiagonal)
    .map(allLinePoints)
    .reduce((acc, cur) => {
      acc = [...acc, ...cur];

      return acc;
    }, [])
    .map(pointToString)
    .reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }

      return acc;
    }, {} as { [key: string]: number });

  const overlap = Object.entries(points).filter(([, count]) => count > 1);

  console.log(overlap);

  // shout(JSON.stringify(overlap, null, 2));
};
