import { Entity } from '@app/shared/entity/entity';
import { Url } from '@app/shared/value-objects/url';
import { Notification } from '@app/shared/notification/notification';
import { UrlShortenerProps } from './types/url-shortener-props';

export class UrlShortener extends Entity<UrlShortenerProps> {
  private _userId?: string;
  private _originalUrl: Url;
  private _shortUrl?: string;
  private _accessCount?: number;
  private _deletedAt?: Date | null;
  public readonly updatedAt?: Date;
  public readonly notification: Notification;
  private readonly baseDomain: string = 'http://localhost';

  constructor(props: UrlShortenerProps) {
    super(props);
    this.notification = new Notification();

    this._userId = props.userId;
    this.updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt ?? null;
    this._accessCount = props.accessCount;
    this._shortUrl = props.shortUrl ?? this.generateShortUrl();
    this._originalUrl = new Url(props.originalUrl, this.notification);
  }

  static create(props: UrlShortenerProps): UrlShortener {
    return new UrlShortener(props);
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

  get accessCount(): number {
    return this._accessCount;
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
    this._accessCount++;
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
    return `${this.baseDomain}/${shortUrl}`;
  }
}
