import CanvasStyle from './CanvasStyle';

export default class ShadowStyle extends CanvasStyle implements CanvasShadowStyles {
  public shadowBlur: number = 0;
  public shadowColor: string = '#000000';
  public shadowOffsetX: number = 0;
  public shadowOffsetY: number = 0;
}
