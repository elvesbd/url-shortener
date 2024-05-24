import { Injectable } from '@nestjs/common';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { ShortUrlRepository } from '@app/short-url/ports';
import { ListShortUrlsInput, ListShortUrlsOutput } from './types';

@Injectable()
export class ListShortUrlsUseCase
  implements UseCase<ListShortUrlsInput, ListShortUrlsOutput>
{
  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}
  async execute(input: ListShortUrlsInput): Promise<ListShortUrlsOutput> {
    const { userId } = input;
    const urlsShort = await this.shortUrlRepository.findAllByUserId(userId);

    return { urlsShort: urlsShort.length ? urlsShort : [] };
  }
}
