import { Entity } from '@app/shared/entity/entity';
import { Notification } from '@app/shared/notification/notification';
import { Url } from '@app/shared/value-objects/url';

type UrlProps = {
  originalUrl: string;
  shortUrl?: string;
};

export class UrlShortener extends Entity<UrlProps> {
  private _originalUrl: Url;
  private _shortUrl: string;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
  public readonly notification: Notification;

  constructor(props: UrlProps) {
    super(props);
    this.notification = new Notification();

    this._originalUrl = new Url(props.originalUrl, this.notification);
    this._shortUrl = props.shortUrl ?? this.generateShortUrl();
  }

  static create(props: UrlProps): UrlShortener {
    return new UrlShortener(props);
  }

  get originalUrl(): string {
    return this._originalUrl.value;
  }

  get shortUrl(): string {
    return this._shortUrl;
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
