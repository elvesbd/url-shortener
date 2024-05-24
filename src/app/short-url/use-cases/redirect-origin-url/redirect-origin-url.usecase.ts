import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrlDeletedException } from '@app/short-url/exceptions/short-url-deleted.exception';

@Injectable()
export class RedirectToOriginalUrlUseCase implements UseCase<string, string> {
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  async execute(shortUrl: string): Promise<string> {
    const urlShortener = await this.shortUrlRepository.findByShortUrl(shortUrl);

    this.validateDeletedUrl(urlShortener);

    urlShortener.incrementAccessCount();
    await this.shortUrlRepository.updateAccessCount(urlShortener);

    return urlShortener.originalUrl;
  }

  private validateDeletedUrl(urlShortener: ShortUrl | null): void {
    if (!urlShortener) {
      throw new NotFoundException('URL not found.');
    }

    if (urlShortener.deletedAt) {
      throw new ShortUrlDeletedException(
        `The URL ${urlShortener.shortUrl} has been deleted and cannot be accessed for redirection.`,
      );
    }
  }
}
