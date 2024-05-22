import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { UrlShortenerRepository } from '@app/url/ports/repository/url-shortener.repository';
import { ListShortenedUrlsInput } from './types/list-shortened-urls.input';
import { ListShortenedUrlsOutput } from './types/list-shortened-urls.output';

@Injectable()
export class ListShortenerUrlsUseCase
  implements UseCase<ListShortenedUrlsInput, ListShortenedUrlsOutput>
{
  constructor(
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}
  async execute(
    input: ListShortenedUrlsInput,
  ): Promise<ListShortenedUrlsOutput> {
    const { userId } = input;
    const urls = await this.urlShortenerRepository.findAllByUserId(userId);

    return { urls: urls.length ? urls : [] };
  }
}
