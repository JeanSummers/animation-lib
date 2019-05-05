import Point from './Point';

export default class Rect {
  public upLeft: Point;
  public downRight: Point;

  constructor(upLeft: Point, downRight: Point);
  constructor(x1: number, y1: number, x2: number, y2: number);
  constructor(x1: number | Point, y1: number | Point, x2?: number, y2?: number) {
    this.upLeft = argsToPoint(x1, x1, y1);
    this.downRight = argsToPoint(y1, x2, y2);
  }

  public contains(point: Point) {
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);

    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);

    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
  }

  public size() {
    return this.upLeft.delta(this.downRight).abs();
  }

  public get x1(): number {
    return this.upLeft.x;
  }
  public set x1(v: number) {
    this.upLeft.x = v;
  }

  public get y1(): number {
    return this.upLeft.y;
  }
  public set y1(v: number) {
    this.upLeft.y = v;
  }

  public get x2(): number {
    return this.downRight.x;
  }
  public set x2(v: number) {
    this.downRight.x = v;
  }

  public get y2(): number {
    return this.downRight.y;
  }
  public set y2(v: number) {
    this.downRight.y = v;
  }
}

function argsToPoint(point: number | Point, x?: number | Point, y?: number | Point): Point {
  if (point instanceof Point) {
    return point;
  }

  return new Point(x as number, y as number);
}
