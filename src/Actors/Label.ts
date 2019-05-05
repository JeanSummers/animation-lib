import Point from '../Shapes/Point';
import Actor from '../Types/Actor';

import { LabelStyle } from '../Styles/LabelStyle';

export default class Label extends Actor {
  public style: LabelStyle;
  public position: Point;
  public text: string;

  constructor(position: Point, text: string = '') {
    super();

    this.position = position;
    this.text = text;
    this.style = new LabelStyle();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.style.text.applyToContext(ctx);

    ctx.fillStyle = this.style.color;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}
