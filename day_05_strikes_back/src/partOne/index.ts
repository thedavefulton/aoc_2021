import { readFile, shout } from "../utils";

export function convertInputToArray(input: string) {
  return input
    .split(" -> ")
    .map((point) => {
      return point.split(",").map((part) => parseInt(part));
    })
    .reduce((acc, cur) => [...acc, ...cur], []);
}

export function isVerticalOrHorizontal([x1, y1, x2, y2]: number[]) {
  return x1 === x2 || y1 === y2;
}

export function orderPoints([x1, y1, x2, y2]: number[]) {
  if (x1 === x2) {
    return y2 > y1 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
  } else {
    return x2 > x1 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
  }
}

export function range(a: number, b: number) {
  if (a > b) throw new Error(`Bad range inputs: [${a}, ${b}]`);

  const arr = [];
  for (let i = a; i <= b; i++) {
    arr.push(i);
  }

  return arr;
}

export function allLinePoints([x1, y1, x2, y2]: number[]) {
  return x1 === x2
    ? range(y1, y2).map((y) => [x1, y])
    : range(x1, x2).map((x) => [x, y1]);
}

export function pointToString([x, y]: number[]) {
  return `${x}:${y}`;
}

export const partOneShout = async () => {
  const lines = await readFile();

  const points = lines
    .map(convertInputToArray)
    .filter(isVerticalOrHorizontal)
    .map(orderPoints)
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

  const overlap = Object.entries(points).filter(([, val]) => val > 1).length;

  shout(JSON.stringify(overlap, null, 2));
};
