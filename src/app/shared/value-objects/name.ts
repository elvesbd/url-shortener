import { Notification } from '@app/shared/notification';

export class Name {
  private _value: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this.validate(notification);
  }

  private validate(notification: Notification) {
    if (!this._value || this._value.trim().length === 0) {
      notification.addNotification('Name should not be empty');
    }

    const specialCharRegex = /[^a-zA-Z\s]/;
    if (specialCharRegex.test(this._value)) {
      notification.addNotification(
        'Name cannot contain special characters or numbers',
      );
    }

    const nameParts = this._value.split(' ');
    if (nameParts.length < 2) {
      notification.addNotification(
        'Name must contain at least a first name and a last name',
      );
    }

    const firstName = nameParts[0];
    if (firstName.length < 3) {
      notification.addNotification(
        'First name must be at least 3 characters long',
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
