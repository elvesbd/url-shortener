import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { GenerateShortUrlInput } from './types/generate-short-url.input';
import { GenerateShortUrlOutput } from './types/generate-short-url.output';
import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { UrlShortener } from '@app/url/domain/url';

@Injectable()
export class GenerateShortUrlUseCase
  implements UseCase<GenerateShortUrlInput, GenerateShortUrlOutput>
{
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}
  async execute(input: GenerateShortUrlInput): Promise<GenerateShortUrlOutput> {
    const { originalUrl, userId } = input;
    const urlShortener = UrlShortener.create({ originalUrl, userId });

    if (!urlShortener.hasNotifications) {
      return {
        data: urlShortener,
        notifications: urlShortener.notifications,
      };
    }

    await this.urlShortenerRepository.generate(urlShortener);

    return { data: urlShortener, notifications: [] };
  }
}
