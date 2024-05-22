import { UseCase } from '@app/shared/interfaces/UseCase';
import { UrlShortener } from '@app/url/domain/url';
import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RegisterAccessUseCase implements UseCase<string, void> {
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}

  async execute(shortUrl: string): Promise<void> {
    const urlShortener =
      await this.urlShortenerRepository.findByShortUrl(shortUrl);

    this.validateDeletedUrl(urlShortener);

    urlShortener.incrementAccessCount();
    await this.urlShortenerRepository.updateAccessCount(
      shortUrl,
      urlShortener.accessCount,
    );
  }

  private validateDeletedUrl(urlShortener: UrlShortener | null): void {
    if (!urlShortener || urlShortener.deletedAt) {
      throw new NotFoundException('URL not found.');
    }
  }
}
