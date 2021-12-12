import _sortBy from "lodash/sortBy";
import { reverse } from "../utils";
import { Point } from "./Point";

type TrackingOption = true | false | undefined;

export class LavaBot {
  points: Point[][];
  length: number;
  height: number;
  basins!: Point[][];

  constructor(lines: string[]) {
    this.points = this.mapLinesToPoints(lines);

    this.length = this.points[0].length || 0;
    this.height = this.points.length || 0;

    if (!this.length || !this.height) throw new Error("Bad length or height");

    this.markLowPoints();
    this.mapBasins();
  }

  mapLinesToPoints(lines: string[]) {
    return lines.map((line, lineIndex) => {
      return line.split("").map((char, charIndex) => {
        const value = parseInt(char);
        return new Point(charIndex, lineIndex, value);
      });
    });
  }

  markLowPoints() {
    this.points = this.points.map((row) => {
      return row.map((point) => {
        if (this.isLowPoint(point)) point.isLowPoint = true;
        return point;
      });
    });
  }

  isLowPoint(point: Point) {
    const [y, x] = point.coords;
    const { above, below, left, right } = this.findAdjacentPoints(point);
    const pointHeight = this.points[y][x].value;
    const adjacentPoints = [above, below, left, right].filter(
      (point) => point !== null
    ) as Point[];
    return (
      adjacentPoints.filter((adjacent) => adjacent.value <= pointHeight)
        .length === 0
    );
  }

  mapBasins() {
    this.basins = this.lowPoints.map((lowPoint) => this.mapBasin(lowPoint));
  }

  mapBasin(point: Point) {
    let basinPoints = [point];
    while (true) {
      const tempPoints = basinPoints
        .map((point) => this.findNonBoundaryAdjacentPoints(point))
        .reduce((acc, cur) => [...acc, ...cur]);
      const tempSet = new Set([...basinPoints, ...tempPoints]);
      if (tempSet.size > basinPoints.length) {
        basinPoints = [...tempSet];
      } else {
        break;
      }
    }
    const basinPointsStrings = basinPoints.map((point) => point.toString());

    return _sortBy(basinPoints, (point) => [point.y, point.x]);
  }

  findNonBoundaryAdjacentPoints(point: Point): Point[] {
    const { above, below, left, right } = this.findAdjacentPoints(point);
    return [above, below, left, right].filter(
      (point) => point !== null && point.value !== 9
    ) as Point[];
  }

  findAdjacentPoints(point: Point) {
    const [y, x] = point.coords;
    const above = this.findAbovePoint(y, x);
    const below = this.findBelowPoint(y, x);
    const left = this.findLeftPoint(y, x);
    const right = this.findRightPoint(y, x);

    return { above, below, left, right };
  }

  findRightPoint(y: number, x: number): Point | null {
    return x === this.length - 1 ? null : this.points[y][x + 1];
  }

  findLeftPoint(y: number, x: number): Point | null {
    return x === 0 ? null : this.points[y][x - 1];
  }

  findBelowPoint(y: number, x: number): Point | null {
    return y === this.height - 1 ? null : this.points[y + 1][x];
  }

  findAbovePoint(y: number, x: number): Point | null {
    return y === 0 ? null : this.points[y - 1][x];
  }

  // crawlPoint(point: Point) {
  //   const { above, below, left, right } = this.findAdjacentPoints(point);
  //   const nonBoundaryPoints: number[][] = [];
  //
  //   if (above && above !== "9") nonBoundaryPoints.push([y - 1, x]);
  //   if (below && below !== "9") nonBoundaryPoints.push([y + 1, x]);
  //
  //   if (left && left !== "9") nonBoundaryPoints.push([y, x - 1]);
  //   if (right && right !== "9") nonBoundaryPoints.push([y, x + 1]);
  //
  //   return nonBoundaryPoints;
  // }

  get riskLevel() {
    return this.lowPoints
      .map((point) => point.value + 1)
      .reduce((acc, cur) => acc + cur);
  }

  get lowPoints() {
    return this.points
      .reduce((acc, cur) => [...acc, ...cur], [])
      .filter((point) => point.isLowPoint);
  }

  get basinScore() {
    return reverse(_sortBy(this.basins, (basin) => basin.length))
      .slice(0, 3)
      .map((basin) => basin.length)
      .reduce((acc, cur) => acc * cur);
  }
}
