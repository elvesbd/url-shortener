import { ShortUrlDataBuilder } from './short-url-data-builder';

export class ShortUrlObjectMother {
  static validUrlShortener() {
    return ShortUrlDataBuilder.aShortUrl().build();
  }

  static withPredefinedShortUrl() {
    const predefinedShortUrl = 'http://localhost/aZbKq7';
    return ShortUrlDataBuilder.aShortUrl()
      .withShortUrl(predefinedShortUrl)
      .build();
  }

  static withInvalidOriginalUrl() {
    const invalidUrl = 'invalid-url';
    return ShortUrlDataBuilder.aShortUrl().withOriginalUrl(invalidUrl).build();
  }

  static withOutUserId() {
    const userId = null;
    return ShortUrlDataBuilder.aShortUrl()
      .withOutUserId(userId)
      .withDeletedAt(null)
      .build();
  }

  static withDeletedAt() {
    const deletionDate = new Date(2024, 4, 22);
    return ShortUrlDataBuilder.aShortUrl().withDeletedAt(deletionDate).build();
  }
}
