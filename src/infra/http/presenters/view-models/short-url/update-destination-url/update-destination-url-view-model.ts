import { UnprocessableEntityException } from '@nestjs/common';
import { BaseViewModel } from '../../base.view-model';
import { ConfigService } from '@nestjs/config';
import { ShortUrl } from '@app/short-url/domain/short-url';

type UpdateDestinationShortUrlVMResponse = {
  shortUrl: string;
  notifications?: string[];
};

export class UpdateDestinationShortUrlViewModel implements BaseViewModel {
  public static toHTTP(
    model: ShortUrl,
    configService: ConfigService,
  ): UpdateDestinationShortUrlVMResponse {
    if (model.hasNotifications) {
      throw new UnprocessableEntityException({
        notifications: model.notifications,
      });
    }

    const baseUrl = configService.get<string>('BASE_URL');
    return {
      shortUrl: `${baseUrl}/${model.shortUrl}`,
    };
  }
}
