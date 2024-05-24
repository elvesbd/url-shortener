import { ShortUrlDataBuilder } from '@app/short-url/__mocks__/data-builder';

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

  static withDifferentUserId() {
    const userId = 'a83049aa-ed36-40a3-950c-84d2e4e4b1a2';
    return ShortUrlDataBuilder.aShortUrl()
      .withUserId(userId)
      .withDeletedAt(null)
      .build();
  }

  static withDeletedAt() {
    const deletionDate = new Date(2024, 4, 22);
    return ShortUrlDataBuilder.aShortUrl().withDeletedAt(deletionDate).build();
  }
}
