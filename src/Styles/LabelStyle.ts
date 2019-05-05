import { Color } from './Color';
import Style from './Style';
import { TextStyle } from './TextStyle';

export class LabelStyle extends Style {
  public color: Color = 'black';
  public text: TextStyle;

  constructor() {
    super();
    this.text = new TextStyle();
  }
}
