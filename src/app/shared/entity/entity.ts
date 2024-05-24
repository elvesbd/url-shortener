import Id from '../value-objects/id';
import { EntityProps } from './types/entity.type';

export class Entity<T> {
  protected _id: Id;
  private _createdAt: Date;

  constructor(props: T & EntityProps) {
    this._id = new Id(props?.id);
    this._createdAt = props.createdAt ?? new Date();
  }

  get createdAt() {
    return this._createdAt;
  }
}
