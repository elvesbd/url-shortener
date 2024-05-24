import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrl } from '@app/short-url/domain/short-url';
import { UpdateDestinationUrlUseCase } from './update-destination-url.usecase';
import { UpdateDestinationUrlInput } from './types/update-destination-url.input';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder/short-url-object.mother';

describe('UpdateDestinationUrlUseCase', () => {
  let sut: UpdateDestinationUrlUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const urlShortenerProps = ShortUrlObjectMother.validUrlShortener();
  const urlShortener = ShortUrl.create(urlShortenerProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(urlShortener),
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
    it('should throw UnauthorizedException if URL not found', async () => {
      const input: UpdateDestinationUrlInput = {
        shortUrl: urlShortener.id.value,
        userId: urlShortener.userId,
        newOriginUrl: '',
      };

      jest.spyOn(shortUrlRepository, 'findById').mockResolvedValueOnce(null);

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if userId does not match', async () => {
      const urlShortenerProps = ShortUrlObjectMother.withOutUserId();
      const urlShortener = ShortUrl.create(urlShortenerProps);

      jest
        .spyOn(shortUrlRepository, 'findById')
        .mockResolvedValueOnce(urlShortener);

      const input: UpdateDestinationUrlInput = {
        shortUrl: urlShortener.id.value,
        userId: 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3',
        newOriginUrl: 'https://new-url.com',
      };

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if URL is marked as deleted', async () => {
      const deletedUrlShortener = ShortUrlObjectMother.withDeletedAt();
      const urlShortener = ShortUrl.create(deletedUrlShortener);
      jest
        .spyOn(shortUrlRepository, 'findById')
        .mockResolvedValueOnce(urlShortener);

      const input: UpdateDestinationUrlInput = {
        shortUrl: '',
        userId: 'a93049aa-ed36-40a3-950c-84d2e4e4b1a2',
        newOriginUrl: '',
      };

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });

    it('should call update destination url with correct values', async () => {
      const input: UpdateDestinationUrlInput = {
        shortUrl: urlShortener.id.value,
        userId: urlShortener.userId,
        newOriginUrl: 'https://new-url.com',
      };

      const output = await sut.execute(input);

      expect(output).toBeDefined();
      expect(output.urlShortener.originalUrl).toBe(input.newOriginUrl);
    });
  });
});
