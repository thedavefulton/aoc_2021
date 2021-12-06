export class Point {
  private readonly _pointString: string;
  private readonly _point: number[];

  constructor(pointString: string) {
    this._pointString = pointString;
    this._point = this.parsePointString();
  }

  // expecting a point string 'a,b'
  // where (a: number, b: number) => [a: x, b: y]
  parsePointString(): number[] {
    return this._pointString.split(',').map((val) => parseInt(val));
  }

  get x(): number {
    return this._point[0];
  }

  get y(): number {
    return this._point[1];
  }
}
