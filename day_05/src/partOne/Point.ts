export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get pointString(): string {
    return `${this.x},${this.y}`;
  }
}
