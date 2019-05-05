import CanvasStyle from './CanvasStyle';

export default class PathStyle extends CanvasStyle {
  public lineCap: CanvasLineCap = 'butt';
  public lineDashOffset: number = 0.0;
  public lineJoin: CanvasLineJoin = 'miter';
  public lineWidth: number = 1;
  public miterLimit: number = 10;
}
