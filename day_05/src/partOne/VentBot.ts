import { Line } from './Line';

export class VentBot {
  private _lineStrings: string[];
  readonly lines: Line[];

  constructor(lines: string[]) {
    this._lineStrings = lines;
    this.lines = this.generateLines();
  }

  private generateLines() {
    // @ts-ignore
    return (
      this._lineStrings
        .map((lineString) => {
          return lineString.split(' -> ').map((pointString) => {
            return pointString.split(',').map((pt) => parseInt(pt));
          });
        })
        .map(([a, b]) => [...a, ...b])
        .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
        .map(([x1, y1, x2, y2]) => {
          let _x1 = x1,
            _x2 = x2;
          if (_x1 > _x2) {
            _x1 = x2;
            _x2 = x1;
          }
          let _y1 = y1,
            _y2 = y2;
          if (_y1 > _y2) {
            _y1 = y2;
            _y2 = y1;
          }

          return [_x1, _y1, _x2, _y2];
        })
        // @ts-ignore
        .map((line) => new Line(...line))
    );
  }
}
