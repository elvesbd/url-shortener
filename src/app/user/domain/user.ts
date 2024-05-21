import { Notification } from '@app/shared/notification/notification';
import { UserProps } from './types/user.props';
import { Entity } from '@app/shared/entity/entity';
import { Name } from '@app/shared/value-objects/name';
import { Email } from '@app/shared/value-objects/email';
import { Password } from '@app/shared/value-objects/password';

export class User extends Entity<UserProps> {
  private _name: Name;
  private _email: Email;
  private _password: Password;
  private _notification: Notification;
  private _updatedAt?: Date;
  private _deletedAt?: Date;

  constructor(props: UserProps) {
    super(props);
    this._notification = new Notification();

    this._name = new Name(props.name, this._notification);
    this._email = new Email(props.email, this._notification);
    this._password = new Password(props.password, this._notification);
  }

  static create(props: UserProps) {
    const user = new User(props);
    if (user.hasNotifications) {
      return null;
    }
    return user;
  }

  get hasNotifications(): boolean {
    return this._notification.hasNotifications();
  }

  get notifications(): string[] {
    return this._notification.getNotifications();
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  toString(): string {
    return `User(name: ${this._name.value}, email: ${this._email.value})`;
  }
}