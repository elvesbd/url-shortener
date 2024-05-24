import { ShortUrl } from '@app/short-url/domain';
import { TypeORMShortUrlEntity } from '../../entities/short-url.entity';

export class TypeORMShortUrlMapper {
  private constructor() {
    throw new Error(
      'TypeORMShortUrlMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMShortUrlEntity): ShortUrl {
    return new ShortUrl({
      id: persistence.id,
      userId: persistence.userId,
      clicks: persistence.clicks,
      shortUrl: persistence.shortUrl,
      deletedAt: persistence.deletedAt,
      createdAt: persistence.createdAt,
      updatedAt: persistence.updatedAt,
      originalUrl: persistence.originalUrl,
    });
  }

  public static toDomainArray(
    persistenceArray: TypeORMShortUrlEntity[],
  ): ShortUrl[] {
    return persistenceArray.map(this.toDomain);
  }

  public static toPersistence(domain: ShortUrl): TypeORMShortUrlEntity {
    return {
      id: domain.id.value,
      userId: domain.userId,
      clicks: domain.clicks,
      shortUrl: domain.shortUrl,
      deletedAt: domain.deletedAt,
      createdAt: domain.createdAt,
      originalUrl: domain.originalUrl,
    };
  }
}
