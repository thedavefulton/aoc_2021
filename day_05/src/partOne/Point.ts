export class Point {
  private readonly _pointString: string;
  readonly x: number;
  readonly y: number;

  constructor(pointString: string) {
    this._pointString = pointString;
    const { x, y } = this.parsePointString();
    this.x = x;
    this.y = y;
  }

  // expecting a point string 'a,b'
  // where (a: number, b: number) => [a: x, b: y]
  parsePointString() {
    const [x, y] = this._pointString.split(',').map((val) => parseInt(val));

    return { x, y };
  }
}
