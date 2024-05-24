import { ShortUrlObjectMother } from '../__mocks__/data-builder/short-url-object.mother';
import { ShortUrl } from './short-url';

describe('ShortUrl', () => {
  jest.clearAllMocks();
  const shortUrlProps = ShortUrlObjectMother.withPredefinedShortUrl();
  const invalidUrlProps = ShortUrlObjectMother.withInvalidOriginalUrl();
  const validUrlShortenerProps = ShortUrlObjectMother.validUrlShortener();

  it('should create a UrlShortener instance', () => {
    const urlShortener = ShortUrl.create(validUrlShortenerProps);

    expect(urlShortener).toBeInstanceOf(ShortUrl);
  });

  it('should generate a short URL', () => {
    const urlShortener = ShortUrl.create(shortUrlProps);

    expect(urlShortener.shortUrl).toMatch(
      /^http:\/\/localhost\/[A-Za-z0-9]{6}$/,
    );
  });

  it('should update the original URL', () => {
    const urlShortener = ShortUrl.create(validUrlShortenerProps);
    const newUrl = 'https://new-url.com';
    urlShortener.updateDestination(newUrl);

    expect(urlShortener.originalUrl).toBe(newUrl);
  });

  it('should increment access count', () => {
    const urlShortener = ShortUrl.create(validUrlShortenerProps);
    const initialCount = urlShortener.accessCount;

    urlShortener.incrementAccessCount();

    expect(urlShortener.accessCount).toBe(initialCount + 1);
  });

  it('should mark the URL as deleted', () => {
    const urlShortener = ShortUrl.create(validUrlShortenerProps);
    urlShortener.markAsDeleted();

    expect(urlShortener.deletedAt).toBeInstanceOf(Date);
  });

  it('should return true if there are notifications', () => {
    const urlShortener = ShortUrl.create(invalidUrlProps);

    expect(urlShortener.hasNotifications).toBeTruthy();
  });

  it('should return list of notifications', () => {
    const urlShortener = ShortUrl.create(invalidUrlProps);

    expect(urlShortener.notifications).toHaveLength(1);
    expect(urlShortener.notifications).toEqual(['Invalid URL format']);
  });
});
