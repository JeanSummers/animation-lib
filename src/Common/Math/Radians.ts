import Degrees from './Degrees';

export default class Radians {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  public toNumber() {
    return this.value;
  }

  public valueOf() {
    return this.value;
  }

  public toString() {
    return this.value;
  }

  public toDegree() {
    return new Degrees((this.value * 180) / Math.PI);
  }
}
