import { Notification } from '@app/shared/notification/notification';

export class Url {
  private _value: string;

  constructor(url: string, notification: Notification) {
    this._value = url;
    this.validate(notification);
  }

  get value(): string {
    return this._value;
  }

  private validate(notification: Notification): void {
    if (!this._value) {
      notification.addNotification('URL should not be empty');
      return;
    }

    const urlRegex =
      /^https:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    if (!urlRegex.test(this._value)) {
      notification.addNotification('Invalid URL format');
    }
  }
}
