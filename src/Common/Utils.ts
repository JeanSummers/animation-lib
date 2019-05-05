import Point from '../Shapes/Point';

export type ObjectLike<T> = { [key in keyof T]?: T[key] };

export function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return new Point(x, y);
}

export class PropertyWatcher<Value, Key extends keyof Value> {
  private _key: Key;
  private _object: Value;

  constructor(obj: Value, property: Key) {
    this._object = obj;
    this._key = property;
  }

  get value() {
    return this._object[this._key];
  }

  set value(value: Value[Key]) {
    this._object[this._key] = value;
  }
}
