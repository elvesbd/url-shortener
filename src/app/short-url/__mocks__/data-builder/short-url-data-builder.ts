import { ShortUrlProps } from '@app/short-url/domain';

export class ShortUrlDataBuilder {
  private props: ShortUrlProps = {
    originalUrl:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda',
    userId: 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3',
  };

  public static aShortUrl(): ShortUrlDataBuilder {
    return new ShortUrlDataBuilder();
  }

  public withShortUrl(shortUrl: string): this {
    this.props.shortUrl = shortUrl;
    return this;
  }

  public withOriginalUrl(url: string): this {
    this.props.originalUrl = url;
    return this;
  }

  public withOutUserId(userId: string): this {
    this.props.userId = userId;
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

  public build(): ShortUrlProps {
    return this.props;
  }
}
