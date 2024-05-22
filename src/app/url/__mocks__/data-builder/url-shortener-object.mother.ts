import { UrlShortenerDataBuilder } from './url-shortener-data-builder';

export class UrlShortenerObjectMother {
  static validUrlShortener() {
    return UrlShortenerDataBuilder.aUrlShortener().build();
  }

  static withPredefinedShortUrl() {
    const predefinedShortUrl = 'http://localhost/aZbKq7';
    return UrlShortenerDataBuilder.aUrlShortener()
      .withShortUrl(predefinedShortUrl)
      .build();
  }

  static withInvalidOriginalUrl() {
    const invalidUrl = 'invalid-url';
    return UrlShortenerDataBuilder.aUrlShortener()
      .withOriginalUrl(invalidUrl)
      .build();
  }

  static withUserId() {
    const userId = 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3';
    return UrlShortenerDataBuilder.aUrlShortener().withUserId(userId).build();
  }

  static withDeletedAt() {
    const deletionDate = new Date(2024, 4, 22);
    return UrlShortenerDataBuilder.aUrlShortener()
      .withDeletedAt(deletionDate)
      .build();
  }
}
