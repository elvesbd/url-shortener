import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { RemoveShortUrlInput } from './types/remove-short-url.input';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { ShortUrlDeletedException } from '@app/short-url/exceptions/short-url-deleted.exception';

@Injectable()
export class RemoveShortUrlUseCase
  implements UseCase<RemoveShortUrlInput, void>
{
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  async execute(input: RemoveShortUrlInput): Promise<void> {
    const { shortUrl, userId } = input;
    const urlShortener = await this.shortUrlRepository.findByShortUrl(shortUrl);

    this.validateUrl(urlShortener, userId);

    urlShortener.markAsDeleted();
    await this.shortUrlRepository.remove(urlShortener);
  }

  private validateUrl(urlShortener: ShortUrl | null, userId: string): void {
    if (!urlShortener) {
      throw new NotFoundException('Shortened URL not found.');
    }

    if (urlShortener.deletedAt) {
      throw new ShortUrlDeletedException(
        `The shortened URL ${urlShortener.shortUrl} has already been removed and cannot be removed again.`,
      );
    }

    if (urlShortener.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to edit this shortened URL.',
      );
    }
  }
}
