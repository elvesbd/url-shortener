import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrlDeletedException } from '@app/short-url/exceptions/short-url-deleted.exception';

@Injectable()
export class RedirectToOriginalUrlUseCase implements UseCase<string, string> {
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  async execute(shortUrl: string): Promise<string> {
    const foundedShortUrl =
      await this.shortUrlRepository.findByShortUrl(shortUrl);

    this.validateDeletedUrl(foundedShortUrl);

    foundedShortUrl.incrementAccessCount();
    await this.shortUrlRepository.updateAccessCount(foundedShortUrl);

    return foundedShortUrl.originalUrl;
  }

  private validateDeletedUrl(foundedShortUrl: ShortUrl | null): void {
    if (!foundedShortUrl) {
      throw new NotFoundException('URL not found.');
    }

    if (foundedShortUrl.deletedAt) {
      throw new ShortUrlDeletedException(
        `The URL ${foundedShortUrl.shortUrl} has been deleted and cannot be accessed for redirection.`,
      );
    }
  }
}
