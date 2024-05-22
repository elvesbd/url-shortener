import { UseCase } from '@app/shared/interfaces/UseCase';
import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { Injectable } from '@nestjs/common';
import { RemoveShortenedUrlInput } from './types/remove-shortened-url.input';
import { UrlShortener } from '@app/url/domain/url';

@Injectable()
export class RemoveShortenedUrlUseCase
  implements UseCase<RemoveShortenedUrlInput, void>
{
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}

  async execute(input: RemoveShortenedUrlInput): Promise<void> {
    const { urlId, userId } = input;
    const urlShortener = await this.urlShortenerRepository.findById(urlId);

    this.validateUrl(urlShortener, userId);

    urlShortener.markAsDeleted();
    await this.urlShortenerRepository.remove(urlId);
  }

  private validateUrl(urlShortener: UrlShortener | null, userId: string): void {
    if (!urlShortener || urlShortener.userId !== userId) {
      throw new Error('URL not found or user not authorized.');
    }

    if (urlShortener.deletedAt) {
      throw new Error('URL is already deleted.');
    }
  }
}
