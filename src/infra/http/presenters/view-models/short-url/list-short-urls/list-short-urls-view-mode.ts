import { ShortUrl } from '@app/short-url/domain/short-url';
import { BaseViewModel } from '../../base.view-model';
import { ConfigService } from '@nestjs/config';

type ListShortUrlsVMResponse = {
  shortUrl: string;
  clicks: number;
  updatedAt: Date;
};

export class ListShortUrlsViewModel implements BaseViewModel {
  public static toHTTP(
    models: ShortUrl[],
    configService: ConfigService,
  ): ListShortUrlsVMResponse[] {
    const baseUrl = configService.get<string>('BASE_URL');

    return models.map((model) => ({
      shortUrl: `${baseUrl}/${model.shortUrl}`,
      clicks: model.clicks,
      updatedAt: model.updatedAt,
    }));
  }
}
