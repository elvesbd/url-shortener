import { UrlShortener } from '@app/url/domain/url';

export abstract class UrlShortenerRepository {
  public abstract remove(urlId: string): Promise<void>;
  public abstract update(url: UrlShortener): Promise<void>;
  public abstract generate(url: UrlShortener): Promise<void>;
  public abstract registerAccess: (shortUrl: string) => Promise<void>;
  public abstract findById(urlId: string): Promise<UrlShortener | null>;
  public abstract updateDestinationUrl(url: UrlShortener): Promise<void>;
  public abstract findAllByUserId(userId: string): Promise<UrlShortener[]>;
  public abstract findByShortUrl: (shortUrl: string) => Promise<UrlShortener>;
  public abstract updateAccessCount: (
    shortUrl: string,
    accessCount: number,
  ) => Promise<void>;
}
