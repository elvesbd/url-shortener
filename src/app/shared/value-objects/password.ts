import { Notification } from '../notification/notification';

export class Password {
  private _value: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this.validate(notification);
  }

  private validate(notification: Notification): void {
    if (this._value.length < 8) {
      notification.addNotification(
        'Password must be at least 8 characters long',
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
