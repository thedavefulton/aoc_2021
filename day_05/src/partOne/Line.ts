import { Point } from './Point';
import { range } from '../utils';

export class Line {
  // _lineString === 'x1,y1 -> x2,y2'
  private _lineString: string;
  readonly pointOne: Point;
  readonly pointTwo: Point;

  constructor(lineString: string) {
    this._lineString = lineString;

    const [pointOne, pointTwo] = this.parseLineString();
    this.pointOne = pointOne;
    this.pointTwo = pointTwo;
  }

  private parseLineString(): Point[] {
    return this._lineString.split(' -> ').map((pointString) => new Point(pointString));
  }

  private getHorizontalPoints(): { x: number; y: number }[] {
    const y = this.pointOne.y;

    return range(this.pointOne.x, this.pointTwo.x + 1).map((x) => ({ x, y }));
  }

  private getVerticalPoints(): { x: number; y: number }[] {
    const x = this.pointOne.x;

    return range(this.pointOne.y, this.pointTwo.y + 1).map((y) => ({ x, y }));
  }

  get isVertical(): boolean {
    return this.pointOne.x === this.pointTwo.x;
  }

  get isHorizontal(): boolean {
    return this.pointOne.y === this.pointTwo.y;
  }

  get points() {
    return this.isHorizontal ? this.getHorizontalPoints() : this.getVerticalPoints();
  }
}
