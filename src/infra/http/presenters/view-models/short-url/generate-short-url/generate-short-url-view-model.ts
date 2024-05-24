import { UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseViewModel } from '../../base.view-model';
import { ShortUrl } from '@app/short-url/domain/short-url';

type GenerateUrlShortVMResponse = {
  shortUrl: string;
  notifications?: string[];
};

export class GenerateUrlShortViewModel implements BaseViewModel {
  public static toHTTP(
    model: ShortUrl,
    configService: ConfigService,
  ): GenerateUrlShortVMResponse {
    if (model.hasNotifications) {
      throw new UnprocessableEntityException({
        notifications: model.notifications,
      });
    }

    const baseUrl = configService.get<string>('BASE_URL');
    return {
      shortUrl: `${baseUrl}${model.shortUrl}`,
    };
  }
}
