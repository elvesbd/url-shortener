import { Injectable } from '@nestjs/common';
import { ShortUrl } from '@app/short-url/domain';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { ShortUrlRepository } from '@app/short-url/ports';
import { GenerateShortUrlInput, GenerateShortUrlOutput } from './types';

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
