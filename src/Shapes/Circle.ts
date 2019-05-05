import Point from './Point';
import Vector from './Vector';

export default class Circle {
  public center: Point;
  public radius: number;

  constructor(center: Point, radius: number);
  constructor(x: number, y: number, radius: number);
  constructor(x: number | Point, y: number, radius?: number) {
    if (x instanceof Point) {
      this.center = x.copy();
      this.radius = y;
      return;
    }

    this.center = new Point(x, y);
    this.radius = radius || 0;
  }

  public getPoint(degree: number) {
    const vec = new Vector(this.radius, 0);

    vec.rotate(degree);

    return vec.toPoint(this.center);
  }
}
