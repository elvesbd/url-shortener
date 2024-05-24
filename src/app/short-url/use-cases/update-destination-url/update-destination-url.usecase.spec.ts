import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrl } from '@app/short-url/domain';
import { UpdateDestinationUrlInput } from './types';
import { ShortUrlRepository } from '@app/short-url/ports';
import { ShortUrlDeletedException } from '@app/short-url/exceptions';
import { UpdateDestinationUrlUseCase } from '@app/short-url/use-cases';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder';

describe('UpdateDestinationUrlUseCase', () => {
  let sut: UpdateDestinationUrlUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const urlShortenerProps = ShortUrlObjectMother.validUrlShortener();
  const shortUrl = ShortUrl.create(urlShortenerProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        findByShortUrl: jest.fn().mockResolvedValue(shortUrl),
        updateDestinationUrl: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [UpdateDestinationUrlUseCase, ShortUrlRepositoryProvider],
    }).compile();

    sut = app.get<UpdateDestinationUrlUseCase>(UpdateDestinationUrlUseCase);
    shortUrlRepository = app.get<ShortUrlRepository>(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if URL not found', async () => {
      const input: UpdateDestinationUrlInput = {
        shortUrl: shortUrl.id.value,
        userId: shortUrl.userId,
        newOriginUrl: '',
      };

      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValueOnce(null);

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if userId does not match', async () => {
      const urlShortenerProps = ShortUrlObjectMother.withOutUserId();
      const shortUrl = ShortUrl.create(urlShortenerProps);

      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValueOnce(shortUrl);

      const input: UpdateDestinationUrlInput = {
        shortUrl: shortUrl.id.value,
        userId: 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3',
        newOriginUrl: 'https://new-url.com',
      };

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw ShortUrlDeletedException if URL is marked as deleted', async () => {
      const deletedUrlShortener = ShortUrlObjectMother.withDeletedAt();
      const shortUrl = ShortUrl.create(deletedUrlShortener);
      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValueOnce(shortUrl);

      const input: UpdateDestinationUrlInput = {
        shortUrl: '',
        userId: 'a93049aa-ed36-40a3-950c-84d2e4e4b1a2',
        newOriginUrl: '',
      };

      await expect(sut.execute(input)).rejects.toThrow(
        ShortUrlDeletedException,
      );
    });

    it('should call update destination url with correct values', async () => {
      const input: UpdateDestinationUrlInput = {
        shortUrl: shortUrl.id.value,
        userId: shortUrl.userId,
        newOriginUrl: 'https://new-url.com',
      };

      const output = await sut.execute(input);

      expect(output).toBeDefined();
      expect(output.urlShortener.originalUrl).toBe(input.newOriginUrl);
    });
  });
});
