import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { RedirectToOriginalUrlUseCase } from './redirect-origin-url.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder/short-url-object.mother';
import { NotFoundException } from '@nestjs/common';
import { ShortUrlDeletedException } from '@app/short-url/exceptions/short-url-deleted.exception';
import { ShortUrl } from '@app/short-url/domain/short-url';

describe('RedirectToOriginalUrlUseCase', () => {
  let sut: RedirectToOriginalUrlUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const shortUrlProps = ShortUrlObjectMother.validUrlShortener();
  const foundedShortUrl = ShortUrl.create(shortUrlProps);

  const shortUrlDeletedProps = ShortUrlObjectMother.withDeletedAt();
  const shortUrlDeleted = ShortUrl.create(shortUrlDeletedProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        findByShortUrl: jest.fn().mockResolvedValue(foundedShortUrl),
        updateAccessCount: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RedirectToOriginalUrlUseCase, ShortUrlRepositoryProvider],
    }).compile();

    sut = app.get<RedirectToOriginalUrlUseCase>(RedirectToOriginalUrlUseCase);
    shortUrlRepository = app.get<ShortUrlRepository>(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('execute', () => {
    const shortUrl = 'aZbKq7';

    it('should call update access count with correct values', async () => {
      await sut.execute(shortUrl);

      expect(shortUrlRepository.updateAccessCount).toHaveBeenCalledTimes(1);
      expect(shortUrlRepository.updateAccessCount).toHaveBeenCalledWith(
        foundedShortUrl,
      );
    });

    it('should throw NotFoundException when short url is not found', async () => {
      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValueOnce(null);

      await expect(sut.execute(shortUrl)).rejects.toThrow(NotFoundException);
    });

    it('should throw ShortUrlDeletedException when short url is deleted', async () => {
      jest
        .spyOn(shortUrlRepository, 'findByShortUrl')
        .mockResolvedValueOnce(shortUrlDeleted);

      await expect(sut.execute(shortUrl)).rejects.toThrow(
        ShortUrlDeletedException,
      );
    });

    it('should return to original url when short url is found', async () => {
      const result = await sut.execute(shortUrl);

      expect(result).toBe(foundedShortUrl.originalUrl);
    });
  });
});
