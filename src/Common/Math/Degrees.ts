import Radians from './Radians';

import { clipValue } from './functions';

export default class Degrees {
  private value: number;

  constructor(value: number) {
    const clipped = clipValue(value, 360);
    this.value = clipped;
  }

  public toNumber() {
    return this.value;
  }

  public toString() {
    return this.value + '\u00B0';
  }

  public valueOf() {
    return this.value;
  }

  public toRadians() {
    return new Radians((this.value * Math.PI) / 180);
  }
}
