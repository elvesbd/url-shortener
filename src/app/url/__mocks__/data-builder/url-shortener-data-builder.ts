import { UrlShortenerProps } from '@app/url/domain/types/url-shortener-props';

export class UrlShortenerDataBuilder {
  private props: UrlShortenerProps = {
    originalUrl:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda',
  };

  public static aUrlShortener(): UrlShortenerDataBuilder {
    return new UrlShortenerDataBuilder();
  }

  public withShortUrl(shortUrl: string): this {
    this.props.shortUrl = shortUrl;
    return this;
  }

  public withOriginalUrl(url: string): this {
    this.props.originalUrl = url;
    return this;
  }

  public withUserId(userId: string): this {
    this.props.userId = userId;
    return this;
  }

  public withDeletedAt(date: Date): this {
    this.props.deletedAt = date;
    return this;
  }

  public build(): UrlShortenerProps {
    return this.props;
  }
}
