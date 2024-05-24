import { Notification } from '@app/shared/notification';

export class Email {
  private _value: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this.validate(notification);
  }

  private validate(notification: Notification): void {
    if (!this._value) {
      notification.addNotification('Email should not be empty');
    }

    if (this._value.length > 320) {
      notification.addNotification('Email should not exceed 320 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._value)) {
      notification.addNotification('Invalid email format');
    }
  }

  get value(): string {
    return this._value;
  }
}
