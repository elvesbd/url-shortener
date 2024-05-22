import { UrlShortenerObjectMother } from '../__mocks__/data-builder/url-shortener-object.mother';
import { UrlShortener } from './url-shortener';

describe('UrlShortener', () => {
  jest.clearAllMocks();
  const shortUrlProps = UrlShortenerObjectMother.withPredefinedShortUrl();
  const invalidUrlProps = UrlShortenerObjectMother.withInvalidOriginalUrl();
  const validUrlShortenerProps = UrlShortenerObjectMother.validUrlShortener();

  it('should create a UrlShortener instance', () => {
    const urlShortener = UrlShortener.create(validUrlShortenerProps);

    expect(urlShortener).toBeInstanceOf(UrlShortener);
  });

  it('should generate a short URL', () => {
    const urlShortener = UrlShortener.create(shortUrlProps);

    expect(urlShortener.shortUrl).toMatch(
      /^http:\/\/localhost\/[A-Za-z0-9]{6}$/,
    );
  });

  it('should update the original URL', () => {
    const urlShortener = UrlShortener.create(validUrlShortenerProps);
    const newUrl = 'https://new-url.com';
    urlShortener.updateDestination(newUrl);

    expect(urlShortener.originalUrl).toBe(newUrl);
  });

  it('should increment access count', () => {
    const urlShortener = UrlShortener.create(validUrlShortenerProps);
    const initialCount = urlShortener.accessCount;

    urlShortener.incrementAccessCount();

    expect(urlShortener.accessCount).toBe(initialCount + 1);
  });

  it('should mark the URL as deleted', () => {
    const urlShortener = UrlShortener.create(validUrlShortenerProps);
    urlShortener.markAsDeleted();

    expect(urlShortener.deletedAt).toBeInstanceOf(Date);
  });

  it('should return true if there are notifications', () => {
    const urlShortener = UrlShortener.create(invalidUrlProps);

    expect(urlShortener.hasNotifications).toBeTruthy();
  });

  it('should return list of notifications', () => {
    const urlShortener = UrlShortener.create(invalidUrlProps);

    expect(urlShortener.notifications).toHaveLength(1);
    expect(urlShortener.notifications).toEqual(['Invalid URL format']);
  });
});
