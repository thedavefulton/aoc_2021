export class Point {
  x: number;
  y: number;
  value: number;
  isLowPoint: boolean;

  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isLowPoint = false;
  }

  get coords() {
    return [this.y, this.x];
  }
}

Point.prototype.toString = function () {
  return `${this.y}:${this.x}`;
};
