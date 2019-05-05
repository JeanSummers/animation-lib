import FrameTime from './FrameTime';

export type Action<T> = (this: T, time: FrameTime) => void;

export default abstract class Actor {
  private _actions?: Array<Action<any>>;

  public addAction(action: Action<this>): this {
    if (!this._actions) {
      this._actions = [];
    }
    this._actions.push(action);
    return this;
  }

  public update(time: FrameTime): void {
    if (!this._actions) {
      return;
    }
    for (const action of this._actions) {
      action.call(this, time);
    }
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
