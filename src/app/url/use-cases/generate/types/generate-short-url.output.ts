import { UrlShortener } from '@app/url/domain/url';

export type GenerateShortUrlOutput = {
  data: UrlShortener;
  notifications?: string[];
};
