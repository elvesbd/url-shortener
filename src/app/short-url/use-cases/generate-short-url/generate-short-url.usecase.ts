import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { GenerateShortUrlInput } from './types/generate-short-url.input';
import { GenerateShortUrlOutput } from './types/generate-short-url.output';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';

@Injectable()
export class GenerateShortUrlUseCase
  implements UseCase<GenerateShortUrlInput, GenerateShortUrlOutput>
{
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}
  async execute(input: GenerateShortUrlInput): Promise<GenerateShortUrlOutput> {
    const { originalUrl, userId } = input;

    const shortUrl = ShortUrl.create({ originalUrl, userId });
    if (shortUrl.hasNotifications) {
      return { shortUrl };
    }

    await this.shortUrlRepository.generate(shortUrl);

    return { shortUrl };
  }
}
