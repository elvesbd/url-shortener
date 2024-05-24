import { Entity } from '@app/shared/entity/entity';
import { Url } from '@app/shared/value-objects/url';
import { Notification } from '@app/shared/notification/notification';
import Id from '@app/shared/value-objects/id';
import { ShortUrlProps } from './types/short-url-props';

export class ShortUrl extends Entity<ShortUrlProps> {
  private _userId?: string;
  private _originalUrl: Url;
  private _shortUrl?: string;
  private _clicks?: number;
  private _deletedAt?: Date | null;
  public readonly updatedAt?: Date;
  public readonly notification: Notification;

  constructor(props: ShortUrlProps) {
    super(props);
    this.notification = new Notification();

    this._userId = props.userId;
    this.updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt ?? null;
    this._clicks = props.clicks;
    this._shortUrl = props.shortUrl ?? this.generateShortUrl();
    this._originalUrl = new Url(props.originalUrl, this.notification);
  }

  static create(props: ShortUrlProps): ShortUrl {
    return new ShortUrl(props);
  }

  get id(): Id {
    return this._id;
  }

  get originalUrl(): string {
    return this._originalUrl.value;
  }

  get shortUrl(): string {
    return this._shortUrl;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  get clicks(): number {
    return this._clicks;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  get hasNotifications(): boolean {
    return this.notification.hasNotifications();
  }

  get notifications(): string[] {
    return this.notification.getNotifications();
  }

  public updateDestination(newOriginalUrl: string): void {
    this._originalUrl = new Url(newOriginalUrl, this.notification);
  }

  public incrementAccessCount(): void {
    this._clicks++;
  }

  public markAsDeleted(): void {
    this._deletedAt = new Date();
  }

  private generateShortUrl(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < length; i++) {
      shortUrl += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return shortUrl;
  }
}
