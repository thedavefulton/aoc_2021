import { range, readFile, readTestFile, shout } from "../utils";
const _zip = require("lodash/zip");
import collect from "collect.js";

type Line = [number, number, number, number];
type Point = [number, number];

export function inputToLine(input: string): Line {
  return input
    .split(" -> ")
    .map((point) => {
      return point.split(",").map((part) => parseInt(part));
    })
    .reduce((acc, cur) => [...acc, ...cur], []) as unknown as Line;
}

export function isVertical([x1, , x2]: Line) {
  return x1 === x2;
}

export function isHorizontal([, y1, , y2]: Line) {
  return y1 === y2;
}

export function isDiagonal([x1, y1, x2, y2]: Line) {
  return Math.abs(x2 - x1) === Math.abs(y2 - y1);
}

export function isValidLine(line: Line) {
  return isVertical(line) || isHorizontal(line) || isDiagonal(line);
}

export function generateVerticalLinePoints([x, y1, , y2]: Line): Point[] {
  return range(y1, y2).map((y) => [x, y]);
}

export function generateHorizontalLinePoints([x1, y, x2]: Line): Point[] {
  return range(x1, x2).map((x) => [x, y]);
}

export function generateDiagonalLinePoints([x1, y1, x2, y2]: Line): Point[] {
  return _zip(range(x1, x2), range(y1, y2));
}

export function generateLinePoints(line: Line) {
  return isVertical(line)
    ? generateVerticalLinePoints(line)
    : isHorizontal(line)
    ? generateHorizontalLinePoints(line)
    : generateDiagonalLinePoints(line);
}

export function pointToString([x, y]: Point) {
  return `${x}:${y}`;
}

export const partThreeShout = async () => {
  // const inputs = await readTestFile();
  const inputs = await readFile();
  const points = collect(inputs)
    .map(inputToLine)
    .filter(isValidLine)
    .map(generateLinePoints)
    .flatten()
    // @ts-ignore
    .map(pointToString)
    .all()
    .reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }

      return acc;
    }, {} as { [key: string]: number });

  const overlap = Object.entries(points).filter(([, value]) => value > 1);

  shout(JSON.stringify(overlap.length, null, 2));
};
