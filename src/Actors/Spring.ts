import Line from '../Shapes/Line';

import LineStyle from '../Styles/LineStyle';

import Actor from '../Types/Actor';

export default class Spring extends Actor {
  public style: LineStyle;

  public line: Line;
  public width: number;
  public initalLength: number;

  public tentionCoefficient: number = 10;

  constructor(line: Line, width: number) {
    super();

    this.style = new LineStyle();

    this.width = width;
    this.line = line;
    this.initalLength = this.line.length;
  }

  public getTension() {
    const dl = this.line.length - this.initalLength;

    const local = this.line.toVector();
    const result = local.div(length).mul(this.tentionCoefficient * dl);

    return result.abs();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const x1 = this.line.p1.x;
    const y1 = this.line.p1.y;
    const x2 = this.line.p2.x;
    const y2 = this.line.p2.y;

    const length = this.initalLength;

    const count = length / 7;
    const piece = 7 + (length % 10) / count;

    this.style.path.applyToContext(ctx);

    ctx.strokeStyle = this.style.color;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i < count; i++) {
      const dot = getDot(x1, y1, x2, y2, length, piece * i);
      const norm = getNormal(x1, y1, x2, y2, 10, i % 2 === 0);

      ctx.lineTo(dot.x - norm.x, dot.y - norm.y);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.fillStyle = this.style.pointColor;
    ctx.beginPath();
    ctx.arc(x1, y1, 2, 0, 2 * Math.PI);
    ctx.arc(x2, y2, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function getNormal(x1: number, y1: number, x2: number, y2: number, width: number, left: boolean) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const z2 = dx < 0 ? -1 : 1;
  const z = z2 * (left ? -1 : 1);

  let a = -dy / dx;
  if (a > Number.MAX_SAFE_INTEGER) {
    a = Number.MAX_SAFE_INTEGER / 2;
  }
  if (a < Number.MIN_SAFE_INTEGER) {
    a = Number.MIN_SAFE_INTEGER / 2;
  }
  const b = width;

  const coef = Math.sqrt(b ** 2 / (a ** 2 + 1));

  return {
    x: z * a * coef,
    y: z * coef,
  };
}

function getDot(x1: number, y1: number, x2: number, y2: number, length: number, cut: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const coef = cut / length;

  return {
    x: x1 + coef * dx,
    y: y1 + coef * dy,
  };
}
