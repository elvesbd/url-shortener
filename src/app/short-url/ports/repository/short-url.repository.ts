import { ShortUrl } from '@app/short-url/domain/short-url';

export abstract class ShortUrlRepository {
  public abstract remove(url: ShortUrl): Promise<void>;
  public abstract generate(url: ShortUrl): Promise<void>;
  public abstract updateDestinationUrl(url: ShortUrl): Promise<void>;
  public abstract updateAccessCount: (url: ShortUrl) => Promise<void>;
  public abstract findAllByUserId(userId: string): Promise<ShortUrl[]>;
  public abstract findByShortUrl: (shortUrl: string) => Promise<ShortUrl>;
}
