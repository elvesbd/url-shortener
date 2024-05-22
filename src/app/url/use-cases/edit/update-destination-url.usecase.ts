import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateDestinationUrlOutput } from './types/update-destination-url.output';
import { UpdateDestinationUrlInput } from './types/update-destination-url.input';
import { UrlShortener } from '@app/url/domain/url';
import { UseCase } from '@app/shared/interfaces/UseCase';

@Injectable()
export class UpdateDestinationUrlUseCase
  implements UseCase<UpdateDestinationUrlInput, UpdateDestinationUrlOutput>
{
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}

  async execute(
    input: UpdateDestinationUrlInput,
  ): Promise<UpdateDestinationUrlOutput> {
    const { userId, urlId, newOriginUrl } = input;

    const urlShortener = await this.urlShortenerRepository.findById(urlId);

    this.validateUrl(urlShortener, userId);

    urlShortener.updateDestination(newOriginUrl);
    await this.urlShortenerRepository.updateDestinationUrl(urlShortener);

    return { urlShortener };
  }

  private validateUrl(urlShortener: UrlShortener | null, userId: string): void {
    if (
      !urlShortener ||
      urlShortener.userId !== userId ||
      urlShortener.deletedAt
    ) {
      throw new UnauthorizedException(
        'Você não está autorizado a editar esta URL encurtada.',
      );
    }
  }
}
