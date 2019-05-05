import CanvasStyle from './CanvasStyle';

export class TextStyle extends CanvasStyle implements CanvasTextDrawingStyles {
  public direction: CanvasDirection = 'inherit';
  public font: string = '10px sans-serif';
  public textAlign: CanvasTextAlign = 'start';
  public textBaseline: CanvasTextBaseline = 'alphabetic';
}
