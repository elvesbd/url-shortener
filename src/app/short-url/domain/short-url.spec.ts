import { ShortUrlObjectMother } from '../__mocks__/data-builder/short-url-object.mother';
import { ShortUrl } from './short-url';

describe('ShortUrl', () => {
  jest.clearAllMocks();
  const shortUrlProps = ShortUrlObjectMother.withPredefinedShortUrl();
  const invalidUrlProps = ShortUrlObjectMother.withInvalidOriginalUrl();
  const validUrlShortenerProps = ShortUrlObjectMother.validUrlShortener();

  it('should create a UrlShortener instance', () => {
    const shortUrl = ShortUrl.create(validUrlShortenerProps);

    expect(shortUrl).toBeInstanceOf(ShortUrl);
  });

  it('should generate a short URL', () => {
    const shortUrl = ShortUrl.create(shortUrlProps);

    expect(shortUrl.shortUrl).toMatch(/^http:\/\/localhost\/[A-Za-z0-9]{6}$/);
  });

  it('should update the original URL', () => {
    const shortUrl = ShortUrl.create(validUrlShortenerProps);
    const newUrl = 'https://new-url.com';
    shortUrl.updateDestination(newUrl);

    expect(shortUrl.originalUrl).toBe(newUrl);
  });

  it('should increment access count', () => {
    const shortUrl = ShortUrl.create(validUrlShortenerProps);
    const initialCount = shortUrl.clicks;

    shortUrl.incrementAccessCount();

    expect(shortUrl.clicks).toBe(initialCount + 1);
  });

  it('should mark the URL as deleted', () => {
    const shortUrl = ShortUrl.create(validUrlShortenerProps);
    shortUrl.markAsDeleted();

    expect(shortUrl.deletedAt).toBeInstanceOf(Date);
  });

  it('should return true if there are notifications', () => {
    const shortUrl = ShortUrl.create(invalidUrlProps);

    expect(shortUrl.hasNotifications).toBeTruthy();
  });

  it('should return list of notifications', () => {
    const shortUrl = ShortUrl.create(invalidUrlProps);

    expect(shortUrl.notifications).toHaveLength(1);
    expect(shortUrl.notifications).toEqual(['Invalid URL format']);
  });
});
