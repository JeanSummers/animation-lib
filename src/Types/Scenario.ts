import Actor from './Actor';

import Point from '../Shapes/Point';

export default class Scenario {
  public drawList: Actor[] = [];
  public actionList: Actor[] = [];

  public addActions(drawList: Actor[], actionList?: Actor[]) {
    this.drawList = drawList;
    this.actionList = actionList || drawList;
  }

  public onMouseDown(pos: Point, event: MouseEvent) {
    /* Not implemented */
  }
  public onMouseUp(pos: Point, event: MouseEvent) {
    /* Not implemented */
  }
  public onMouseMove(pos: Point, event: MouseEvent) {
    /* Not implemented */
  }
  public onMouseEnter(pos: Point, event: MouseEvent) {
    /* Not implemented */
  }
  public onMouseLeave(pos: Point, event: MouseEvent) {
    /* Not implemented */
  }
}
