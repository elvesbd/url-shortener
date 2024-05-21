import { Notification } from '../notification/notification';

export class Email {
  private _value: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this.validate(notification);
  }

  private validate(notification: Notification): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._value)) {
      notification.addNotification('Invalid email format');
    }
  }

  get value(): string {
    return this._value;
  }
}
