import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { RegisterAccessUseCase } from '../register-access/register-access.usecase';
import { UrlShortener } from '@app/url/domain/url';
import { UseCase } from '@app/shared/interfaces/UseCase';

@Injectable()
export class RedirectToOriginalUrlUseCase implements UseCase<string, string> {
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
    private readonly registerAccessUseCase: RegisterAccessUseCase,
  ) {}

  async execute(shortUrl: string): Promise<string> {
    const urlShortener =
      await this.urlShortenerRepository.findByShortUrl(shortUrl);

    this.validateDeletedUrl(urlShortener);
    await this.registerAccessUseCase.execute(shortUrl);

    return urlShortener.originalUrl;
  }

  private validateDeletedUrl(urlShortener: UrlShortener | null): void {
    if (!urlShortener || urlShortener.deletedAt) {
      throw new NotFoundException('URL not found.');
    }
  }
}
