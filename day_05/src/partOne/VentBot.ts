import { Line } from './Line';

export class VentBot {
  private _lineStrings: string[];
  readonly lines: Line[];
  readonly chart: { [key: string]: number };

  constructor(lines: string[]) {
    this._lineStrings = lines;
    this.lines = this.generateLines();
    this.chart = this.generateChart();
  }

  private generateLines() {
    // @ts-ignore
    return this._lineStrings
      .map((lineString) => {
        return lineString.split(' -> ').map((pointString) => {
          return pointString.split(',').map((pt) => parseInt(pt));
        });
      })
      .map(([a, b]) => [...a, ...b])
      .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
      .map(([x1, y1, x2, y2]) => {
        if (x1 > x2) {
          return [x2, y1, x1, y2];
        } else if (y2 > y1) {
          return [x1, y2, x2, y1];
        } else {
          return [x1, y1, x2, y2];
        }
      })
      .map((line) => new Line(line));
  }

  private generateChart() {
    return this.lines.reduce((acc, cur) => {
      for (const point of cur.points) {
        const pointStr = point.toString();
        if (acc[pointStr]) {
          acc[pointStr] += 1;
        } else {
          acc[pointStr] = 1;
        }
      }

      return acc;
    }, {} as { [key: string]: number });
  }

  get overlappingPoints() {
    return Object.keys(this.chart).filter((key) => this.chart[key] > 1);
  }
}
