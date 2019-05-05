import BaseStyle from './Style';

import { ObjectLike } from '../Common/Utils';

export default class CanvasStyle extends BaseStyle {
  public applyToContext(ctx: CanvasRenderingContext2D) {
    Object.assign(ctx, this);
  }
}

export function applyCanvasStyle<Style extends CanvasStyle>(ctx: CanvasRenderingContext2D, style: Style) {
  Object.assign(ctx, style);
}

export function setStyle<Style>(style: Style, object: ObjectLike<Style>) {
  Object.assign(style, object);
}
