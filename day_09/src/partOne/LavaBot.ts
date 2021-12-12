import { range } from "../utils";

type TrackingOption = true | false | undefined;

export class LavaBot {
  lines: string[];
  length: number;
  height: number;
  lowPoints: number[][];
  basins: number[][][];

  constructor(lines: string[]) {
    this.lines = lines;
    this.length = lines[0].length || 0;
    this.height = lines.length || 0;
    this.lowPoints = [];
    this.basins = [];

    if (!this.length || !this.height) throw new Error("Bad length or height");

    this.markLowPoints();
    // this.mapBasin([0, 0]);
  }

  markLowPoints() {
    this.lines.map((line, lineIndex) => {
      line.split("").map((char, charIndex) => {
        if (this.isLowPoint(lineIndex, charIndex))
          this.lowPoints.push([lineIndex, charIndex]);
      });
    });
  }

  isLowPoint(y: number, x: number) {
    const { above, below, left, right } = this.findAdjacentHeights(y, x);
    const pointHeight = parseInt(this.lines[y][x]);
    return (
      [above, below, left, right].filter(
        (adjacent) => parseInt(adjacent) <= pointHeight
      ).length === 0
    );
  }

  findAdjacentHeights(y: number, x: number) {
    const above = this.findAboveHeight(y, x);
    const below = this.findBelowHeight(y, x);
    const left = this.findLeftHeight(y, x);
    const right = this.findRightHeight(y, x);

    return { above, below, left, right };
  }

  findRightHeight(y: number, x: number) {
    return x === this.length - 1 ? "" : this.lines[y][x + 1];
  }

  findLeftHeight(y: number, x: number) {
    return x === 0 ? "" : this.lines[y][x - 1];
  }

  findBelowHeight(y: number, x: number) {
    return y === this.height - 1 ? "" : this.lines[y + 1][x];
  }

  findAboveHeight(y: number, x: number) {
    return y === 0 ? "" : this.lines[y - 1][x];
  }

  mapBasin([y, x]: [number, number]) {
    // let basinPoints = [[y, x]];
    // while (true) {
    //   console.log(basinPoints);
    //   const tempPoints = [];
    //   for (const point of basinPoints) {
    //     const crawledPoints = this.crawlPoint(point);
    //     tempPoints.push(crawledPoints);
    //   }
    //   const newBasinPoints = tempPoints.reduce(
    //     (acc, cur) => {
    //       return [...acc, ...cur];
    //     },
    //     [...basinPoints]
    //   );
    //   console.log({ newBasinPoints, basinPoints });
    //   if (newBasinPoints.length === basinPoints.length) {
    //     break;
    //   } else {
    //     basinPoints = newBasinPoints;
    //   }
    // }
  }

  crawlPoint([y, x]: number[]) {
    const { above, below, left, right } = this.findAdjacentHeights(y, x);
    const nonBoundaryPoints: number[][] = [];

    if (above && above !== "9") nonBoundaryPoints.push([y - 1, x]);
    if (below && below !== "9") nonBoundaryPoints.push([y + 1, x]);

    if (left && left !== "9") nonBoundaryPoints.push([y, x - 1]);
    if (right && right !== "9") nonBoundaryPoints.push([y, x + 1]);

    return nonBoundaryPoints;
  }

  get riskLevel() {
    return this.lowPoints.reduce((acc, [lineIndex, charIndex]) => {
      const risk = parseInt(this.lines[lineIndex][charIndex]) + 1;
      return acc + risk;
    }, 0);
  }
}
