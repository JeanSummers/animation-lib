import { ObjectLike } from '../Common/Utils';

export default class Style {
  public set(object: ObjectLike<this>) {
    Object.assign(this, object);
  }
}
