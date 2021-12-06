import { Point } from './Point';

export class Line {
  // _lineString === 'x1,y1 -> x2,y2'
  private _lineString: string;
  private _pointOne: Point;
  private _pointTwo: Point;

  constructor(lineString: string) {
    this._lineString = lineString;

    const [pointOne, pointTwo] = this.parseLineString();
    this._pointOne = pointOne;
    this._pointTwo = pointTwo;
  }

  private parseLineString(): Point[] {
    return this._lineString.split(' -> ').map((pointString) => new Point(pointString));
  }

  get isVertical(): boolean {
    return this._pointOne.x === this._pointTwo.x;
  }

  get isHorizontal(): boolean {
    return this._pointOne.y === this._pointTwo.y;
  }
}
