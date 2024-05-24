import { Notification } from '@app/shared/notification';

export class Password {
  private _value: string;

  constructor(value: string, notification?: Notification) {
    this._value = value;
    this.validate(notification);
  }

  private validate(notification: Notification): void {
    if (this._value.length < 8) {
      notification.addNotification(
        'Password must be at least 8 characters long',
      );
    }

    const hasLetter = /[a-zA-Z]/.test(this._value);
    if (!hasLetter) {
      notification.addNotification('Password must contain at least one letter');
    }

    const hasNumber = /\d/.test(this._value);
    if (!hasNumber) {
      notification.addNotification('Password must contain at least one number');
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this._value);
    if (!hasSpecialChar) {
      notification.addNotification(
        'Password must contain at least one special character',
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
