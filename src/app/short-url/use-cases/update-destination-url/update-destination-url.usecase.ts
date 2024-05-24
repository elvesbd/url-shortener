import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { UpdateDestinationUrlInput } from './types/update-destination-url.input';
import { UpdateDestinationUrlOutput } from './types/update-destination-url.output';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { ShortUrlDeletedException } from '@app/short-url/exceptions/short-url-deleted.exception';

@Injectable()
export class UpdateDestinationUrlUseCase
  implements UseCase<UpdateDestinationUrlInput, UpdateDestinationUrlOutput>
{
  constructor(private readonly urlShortenerRepository: ShortUrlRepository) {}

  async execute(
    input: UpdateDestinationUrlInput,
  ): Promise<UpdateDestinationUrlOutput> {
    const { userId, shortUrl, newOriginUrl } = input;

    const urlShortener =
      await this.urlShortenerRepository.findByShortUrl(shortUrl);

    this.validateUrl(urlShortener, userId);

    urlShortener.updateDestination(newOriginUrl);
    if (urlShortener.hasNotifications) return { urlShortener };

    await this.urlShortenerRepository.updateDestinationUrl(urlShortener);

    return { urlShortener };
  }

  private validateUrl(urlShortener: ShortUrl | null, userId: string): void {
    if (!urlShortener) {
      throw new NotFoundException('Shortened URL not found.');
    }

    if (urlShortener.deletedAt) {
      throw new ShortUrlDeletedException(
        `The shortened URL ${urlShortener.shortUrl} has been deleted and cannot be updated.`,
      );
    }

    if (urlShortener.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to edit this shortened URL.',
      );
    }
  }
}
