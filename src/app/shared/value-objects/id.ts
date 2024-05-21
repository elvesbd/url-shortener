import { randomUUID } from 'node:crypto';

export default class Id {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }

  get value() {
    return this._value;
  }
}
