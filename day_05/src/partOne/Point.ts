export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

Point.prototype.toString = function pointToString() {
  return `${this.x},${this.y}`;
};
