import LineStyle from '../Styles/LineStyle';

import Line from '../Shapes/Line';
import Point from '../Shapes/Point';
import Actor from '../Types/Actor';

export default class VectorItem extends Actor {
  public line: Line;
  public style: LineStyle;

  constructor(line: Line);
  constructor(p1: Point, p2: Point);
  constructor(x1: number, y1: number, x2: number, y2: number);
  constructor(x1: number | Point | Line, y1?: number | Point, x2?: number, y2?: number) {
    super();

    this.style = new LineStyle();

    if (x1 instanceof Line) {
      this.line = x1;
      return;
    }

    // Hack. Breaks type system
    // Dangerous if Line constructor signature changes
    this.line = new Line(x1 as number, y1 as number, x2 as number, y2 as number);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (Math.abs(this.line.length) < 1) {
      return;
    }

    const x1 = this.line.p1.x;
    const y1 = this.line.p1.y;
    const x2 = this.line.p2.x;
    const y2 = this.line.p2.y;

    this.style.path.applyToContext(ctx);

    ctx.strokeStyle = this.style.color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const shrink = new Line(this.line.p1, this.line.p2);
    shrink.length = shrink.length + 4 * this.style.path.lineWidth;

    const end = new Line(this.line.p2, shrink.p2);

    const leftSide = new Line(end.p1, end.p2);
    leftSide.length = leftSide.length / 2;
    const rightSide = new Line(end.p1, end.p2);
    rightSide.length = rightSide.length / 2;

    leftSide.rotate(-90);
    rightSide.rotate(90);

    ctx.fillStyle = this.style.color;
    ctx.beginPath();
    ctx.moveTo(leftSide.p2.x, leftSide.p2.y);
    ctx.lineTo(end.p2.x, end.p2.y);
    ctx.lineTo(rightSide.p2.x, rightSide.p2.y);
    ctx.lineTo(leftSide.p2.x, leftSide.p2.y);
    ctx.fill();
  }
}
