import Point from './Point';
import Vector from './Vector';

export default class Line {
  public p1: Point;
  public p2: Point;

  constructor(p1: Point, p2: Point);
  constructor(x1: number, y1: number, x2: number, y2: number);
  constructor(x1: number | Point, y1: number | Point, x2?: number, y2?: number) {
    try {
      [this.p1, this.p2] = construct(x1, y1, x2, y2);
    } catch {
      throw new Error('Trying to construct line with invalid components: ' + `(${x1}, ${y1}) (${x2}, ${y2})`);
    }
  }

  get length(): number {
    return this.p1.dist(this.p2);
  }

  set length(scale: number) {
    if (!this.length) {
      return;
    }

    const delta = this.toVector();

    delta.length = scale;

    this.p2 = delta.toPoint(this.p1);
  }

  public move(position: Point) {
    const delta = this.toVector();

    this.p1.copy(position);

    this.fromVector(delta);
  }

  public rotate(degree: number) {
    const delta = this.toVector();

    delta.rotate(degree);

    this.fromVector(delta);
  }

  public toVector() {
    return this.p2.delta(this.p1);
  }

  public fromVector(vector: Vector) {
    this.p2.copy(this.p1);
    this.p2.add(vector);
  }
}

function construct(x1: number | Point, y1: number | Point, x2?: number, y2?: number) {
  if (x1 instanceof Point && y1 instanceof Point) {
    return constructFromPoints(x1, y1);
  }

  // Point constructor will throw if arguments are wrong
  return constructFromCoordinates(x1 as number, y1 as number, x2 as number, y2 as number);
}

function constructFromPoints(p1: Point, p2: Point) {
  return [p1.copy(), p2.copy()];
}

function constructFromCoordinates(x1: number, y1: number, x2: number, y2: number) {
  return [new Point(x1, y1), new Point(x2, y2)];
}
