import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RemoveShortUrlInput } from './types';
import { ShortUrl } from '@app/short-url/domain';
import { ShortUrlRepository } from '@app/short-url/ports';
import { RemoveShortUrlUseCase } from './remove-short-url.usecase';
import { ShortUrlDeletedException } from '@app/short-url/exceptions';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder';

describe('RemoveShortUrlUseCase', () => {
  let sut: RemoveShortUrlUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const shortUrlProps = ShortUrlObjectMother.validUrlShortener();
  const foundedShortUrl = ShortUrl.create(shortUrlProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        remove: jest.fn().mockResolvedValue(0),
        findByShortUrl: jest.fn().mockResolvedValue(foundedShortUrl),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RemoveShortUrlUseCase, ShortUrlRepositoryProvider],
    }).compile();

    sut = app.get<RemoveShortUrlUseCase>(RemoveShortUrlUseCase);
    shortUrlRepository = app.get<ShortUrlRepository>(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('execute', () => {
    const userId = 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3';
    const shortUrl = 'd93A49';
    const input: RemoveShortUrlInput = {
      shortUrl,
      userId,
    };

    it('should call find by short url with correct values', async () => {
      await sut.execute(input);

      expect(shortUrlRepository.findByShortUrl).toHaveBeenCalledTimes(1);
      expect(shortUrlRepository.findByShortUrl).toHaveBeenCalledWith(shortUrl);
    });

    it('should throw NotFoundException when short url is not found', async () => {
      jest.spyOn(shortUrlRepository, 'findByShortUrl').mockResolvedValue(null);

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should throw ShortUrlDeletedException when short url is already deleted', async () => {
      const shortUrlPropsWithDeletedAt = ShortUrlObjectMother.withDeletedAt();
      const foundedShortUrlDeletedAt = ShortUrl.create(
        shortUrlPropsWithDeletedAt,
      );

      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValue(foundedShortUrlDeletedAt);

      await expect(sut.execute(input)).rejects.toThrow(
        ShortUrlDeletedException,
      );
    });

    it('should throw UnauthorizedException if userId does not match', async () => {
      const shortUrlProps = ShortUrlObjectMother.withDifferentUserId();
      const foundedShortUrlWithDifferentId = ShortUrl.create(shortUrlProps);

      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValue(foundedShortUrlWithDifferentId);

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });
  });
});
