import { range, readFile, readTestFile, shout } from '../utils';
import { VentBot } from './VentBot';
import { runHelp } from './help';

export function convertInputToArray(input: string) {
  const re = /(\d+),(\d+) -> (\d+),(\d+)/;

  const inputParts = re.exec(input);
  return inputParts?.length === 5
    ? inputParts.slice(1).map((numStr) => parseInt(numStr))
    : [];
}

export function smallestPointFirst([x1, y1, x2, y2]: number[]) {
  if (x1 === x2) {
    return y2 > y1 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
  } else {
    return x2 > x1 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
  }
}

export function generateAllPoints([x1, y1, x2, y2]: number[]) {
  if (x1 === x2) {
    return range(y1, y2).map((y) => [x1, y]);
  }

  return range(x1, x2).map((x) => [x, y1]);
}

function doItAll(lines: string[]) {
  const chart = lines
    .map(convertInputToArray)
    // We only want vertical or horizontal lines
    .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
    .map(smallestPointFirst)
    .map(generateAllPoints)
    .reduce((acc, cur) => {
      return [...acc, ...cur];
    }, [] as number[][])
    .reduce((acc, [x, y]) => {
      const pointString = `${x},${y}`;
      acc.set(pointString, (acc.get(pointString) ?? 0) + 1);

      return acc;
    }, new Map<string, number>());

  const overlappingPoints = [...chart.entries()].filter(
    ([, value]) => value > 4
  );

  console.log(overlappingPoints, overlappingPoints.length);

  //   .map(([x1, y1, x2, y2]) => {
  //     if (x1 === x2) {
  //       return y2 > y1 ? [x1, y1, x2, y2] : [x1, y2, x2, y1];
  //     } else {
  //       return x2 > x1 ? [x1, y1, x2, y2] : [x2, y1, x1, y2];
  //     }
  //   })
  //   .map(([x1, y1, x2, y2]) => {
  //     if (x1 === x2) {
  //       return range(y1, y2).map((y) => [x1, y]);
  //     } else {
  //       return range(x1, x2).map((x) => [x, y1]);
  //     }
  //   })
  //   .reduce((acc, cur) => {
  //     return [...acc, ...cur];
  //   }, [])
  //   .map((point) => point.join(','))
  //   .reduce((acc, cur) => {
  //     if (acc[cur]) {
  //       acc[cur] += 1;
  //     } else {
  //       acc[cur] = 1;
  //     }
  //
  //     return acc;
  //   }, {} as { [key: string]: number });
  //
  // return Object.keys(chart).filter((key) => chart[key] > 1).length;
}

export const partOneShout = async () => {
  await runHelp();
  const lines = await readFile();
  console.log(doItAll(lines));
};
