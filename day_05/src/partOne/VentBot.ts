import { Line } from './Line';

export class VentBot {
  private _lineStrings: string[];
  private _lines: Line[];

  constructor(lines: string[]) {
    this._lineStrings = lines;
    this._lines = this.parseLineStrings();
  }

  private parseLineStrings() {
    return this._lineStrings.map((lineString) => new Line(lineString));
  }

  get partOneLines() {
    return this._lines.filter((line) => line.isVertical || line.isHorizontal);
  }
}
