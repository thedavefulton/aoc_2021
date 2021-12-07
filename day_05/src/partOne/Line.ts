import { Point } from './Point';
import { range } from '../utils';

export class Line {
  readonly x1: number;
  readonly y1: number;

  readonly x2: number;
  readonly y2: number;

  readonly isVertical: boolean;
  readonly length: number;
  readonly points: Point[];

  constructor([x1, y1, x2, y2]: [number, number, number, number]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.isVertical = this.x1 === this.x2;
    this.length = (this.isVertical ? this.y2 - this.y1 : this.x2 - this.x1) + 1;

    this.points = this.generatePoints();
  }

  private generatePoints() {
    return this.isVertical
      ? this.generateVerticalPoints()
      : this.generateHorizontalPoints();
  }

  generateVerticalPoints() {
    return range(this.y1, this.y2).map((yIndex) => new Point(this.x1, yIndex));
  }

  generateHorizontalPoints() {
    return range(this.x1, this.x2).map((xIndex) => new Point(xIndex, this.y1));
  }
}
