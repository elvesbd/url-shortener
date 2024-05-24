import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { dataSource } from '../../datasource';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { TypeORMShortUrlEntity } from '../../entities/short-url.entity';
import { TypeORMShortUrlMapper } from '../../mappers/short-url/short-url-mapper';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';

@Injectable()
export class TypeORMShortUrlRepository implements ShortUrlRepository {
  private repository: Repository<TypeORMShortUrlEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMShortUrlEntity);
  }

  public async generate(shortUrl: ShortUrl): Promise<void> {
    const newShortUrl = TypeORMShortUrlMapper.toPersistence(shortUrl);
    await this.repository.save(newShortUrl);
  }

  public async updateDestinationUrl(url: ShortUrl): Promise<void> {
    const foundedShortUrl = await this.repository.findOne({
      where: { shortUrl: url.shortUrl },
    });

    if (!foundedShortUrl) return null;
    foundedShortUrl.originalUrl = url.originalUrl;

    await this.repository.save(foundedShortUrl);
  }

  public async updateAccessCount(shortUrl: ShortUrl): Promise<void> {
    const { id, clicks } = shortUrl;
    await this.repository.update(id.value, { clicks });
  }

  public async remove(shortUrl: ShortUrl): Promise<void> {
    const { id, deletedAt } = shortUrl;
    await this.repository.update(id.value, { deletedAt });
  }

  public async findAllByUserId(userId: string): Promise<ShortUrl[]> {
    const shortUrls = await this.repository.find({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return TypeORMShortUrlMapper.toDomainArray(shortUrls);
  }

  public async findByShortUrl(shortUrl: string): Promise<ShortUrl> {
    const foundedShortUrl = await this.repository.findOne({
      where: { shortUrl },
      withDeleted: true,
    });

    if (!foundedShortUrl) return null;

    return TypeORMShortUrlMapper.toDomain(foundedShortUrl);
  }
}
