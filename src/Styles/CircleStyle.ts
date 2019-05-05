import { Color } from './Color';
import PathStyle from './PathStyle';
import Style from './Style';

export class CircleStyle extends Style {
  public fill: boolean = true;
  public color: Color = 'black';
  public border: PathStyle;

  private _borderColor?: Color;

  constructor() {
    super();
    this.border = new PathStyle();
  }

  get borderColor(): Color {
    return this._borderColor || this.color;
  }

  set borderColor(color: Color) {
    this._borderColor = color;
  }

  public hasBorder() {
    return !!this._borderColor;
  }
}
