import Line from './Line';

/**
 * Point relative to global coordinates
 */
export default class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(`Trying to construct point with invalid components: (${x}, ${y})`);
    }

    this.x = x;
    this.y = y;
  }

  /**
   * Create new instance identical to this
   */
  public copy(): Point;
  /**
   * Copy content of another point
   * @param source Source
   */
  public copy(source: Point): void;
  public copy(source?: Point) {
    if (!source) {
      return new Point(this.x, this.y);
    }

    this.x = source.x;
    this.y = source.y;

    return this;
  }

  /**
   * Get distance to point
   */
  public dist(point: Point) {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  /**
   * Is points equal
   */
  public eq(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  /**
   * Return relative position to another point
   */
  public delta(point: Point): Vector {
    return new Vector(this.x - point.x, this.y - point.y);
  }

  public relative(point: Point): Vector {
    return this.delta(point);
  }

  // Self-explaining operations

  public abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);

    return this;
  }

  public pow(power: number) {
    this.x = Math.pow(this.x, power);
    this.y = Math.pow(this.y, power);

    return this;
  }

  public mul(value: number) {
    this.x *= value;
    this.y *= value;

    return this;
  }

  public div(value: number) {
    this.x /= value;
    this.y /= value;

    return this;
  }

  public add(point: Vector) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  public sub(point: Vector) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }
}

/**
 * Vector 2d
 * Also used as local point
 */
export class Vector extends Point {
  /**
   * Create new instance identical to this
   */
  public copy(): Vector;
  /**
   * Copy content of another vector
   * @param source Source
   */
  public copy(source: Vector): void;
  public copy(source?: Vector) {
    if (!source) {
      return new Vector(this.x, this.y);
    }

    this.x = source.x;
    this.y = source.y;

    return this;
  }

  get length(): number {
    return this.dist(new Point(0, 0));
  }

  set length(scale: number) {
    this.mul(scale / this.length);
  }

  public dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  public rotate(degree: number) {
    const radians = toRadians(degree);
    if (!radians) {
      return this;
    }

    return this.rotateRad(radians);
  }

  public rotateRad(radians: number) {
    // Avoid rewrite of this.x
    [this.x, this.y] = [
      this.x * Math.cos(radians) - this.y * Math.sin(radians),
      this.x * Math.sin(radians) + this.y * Math.cos(radians),
    ];
    return this;
  }

  /**
   * Places vector to relative position thus making it a line
   * @param point Position where vector will be placed
   */
  public toLine(point: Point) {
    return new Line(point, this.toPoint(point));
  }

  public toPoint(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}

function toRadians(degree: number) {
  const clipped = clipValue(degree, 360);
  return clipped * (Math.PI / 180);
}

function clipValue(value: number, clip: number) {
  return Math.sign(value) * (Math.abs(value) % clip);
}
