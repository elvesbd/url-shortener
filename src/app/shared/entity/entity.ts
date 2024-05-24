import { EntityProps } from './types/entity.type';
import Id from '../value-objects/id';

export class Entity<T> {
  protected _id: Id;
  private _createdAt: Date;

  constructor(props: T & EntityProps) {
    this._id = new Id(props?.id);
    this._createdAt = props.createdAt ?? new Date();
  }

  /* get value() {
    return this._id;
  } */

  get createdAt() {
    return this._createdAt;
  }
}
