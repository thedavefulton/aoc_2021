import { range } from "../utils";

type TrackingOption = true | false | undefined;

export class LavaBot {
  lines: string[];
  length: number;
  height: number;
  lowPoints: number[];

  constructor(lines: string[]) {
    this.lines = lines;
    this.length = lines[0].length || 0;
    this.height = lines.length || 0;
    this.lowPoints = [];

    if (!this.length || !this.height) throw new Error("Bad length or height");

    this.markLowPoints();
  }

  markLowPoints() {
    this.lines.map((line, lineIndex) => {
      line.split("").map((char, charIndex) => {
        if (this.isLowPoint(lineIndex, charIndex))
          this.lowPoints.push(parseInt(this.lines[lineIndex][charIndex]));
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

  get riskLevel() {
    return this.lowPoints.reduce((acc, cur) => {
      const risk = cur + 1;
      return acc + risk;
    }, 0);
  }
}
