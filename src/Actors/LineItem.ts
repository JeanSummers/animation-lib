import Line from '../Shapes/Line';
import Point from '../Shapes/Point';

import Actor from '../Types/Actor';

import LineStyle from '../Styles/LineStyle';

export default class LineItem extends Actor {
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

    ctx.fillStyle = this.style.pointColor;
    ctx.beginPath();
    ctx.arc(x1, y1, ctx.lineWidth * 2, 0, 2 * Math.PI);
    ctx.arc(x2, y2, ctx.lineWidth * 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
