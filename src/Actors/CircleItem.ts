import Circle from '../Shapes/Circle';
import Point from '../Shapes/Point';
import Vector from '../Shapes/Vector';

import Actor from '../Types/Actor';

import { CircleStyle } from '../Styles/CircleStyle';

export default class CircleItem extends Actor {
  public style: CircleStyle;

  public shape: Circle;
  public displace: Vector;

  get global() {
    return this.displace.toPoint(this.shape.center);
  }

  set global(point: Point) {
    const pos = point.copy();
    this.displace = pos.delta(this.shape.center);
  }

  constructor(center: Point, radius: number) {
    super();

    this.shape = new Circle(center, radius);

    this.displace = new Vector(0, 0);
    this.style = new CircleStyle();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const filled = this.style.fill;
    const border = this.style.hasBorder();
    const pos = this.global;

    if (filled) {
      drawFill(ctx, this, pos);
    }

    if (!filled || border) {
      drawStroke(ctx, this, pos);
    }
  }
}

function drawStroke(ctx: CanvasRenderingContext2D, item: CircleItem, pos: Point) {
  item.style.border.applyToContext(ctx);
  ctx.strokeStyle = item.style.borderColor;

  arc(ctx, pos.x, pos.y, item.shape.radius);
  ctx.stroke();
}

function drawFill(ctx: CanvasRenderingContext2D, item: CircleItem, pos: Point) {
  ctx.fillStyle = item.style.color;

  arc(ctx, pos.x, pos.y, item.shape.radius);
  ctx.fill();
}

function arc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
}
