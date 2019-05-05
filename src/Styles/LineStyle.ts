import { Color } from './Color';
import PathStyle from './PathStyle';
import Style from './Style';

export default class LineStyle extends Style {
  public color: Color = 'black';
  public path: PathStyle;

  private _pointColor?: Color;

  constructor() {
    super();

    this.path = new PathStyle();
  }

  get pointColor() {
    return this._pointColor || this.color;
  }

  set pointColor(color: Color) {
    this._pointColor = color;
  }

  public hasPointColor() {
    return !!this._pointColor;
  }
}
