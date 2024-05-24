import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlRepository } from '@app/short-url/ports';
import { GenerateShortUrlUseCase } from '@app/short-url/use-cases';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder';

describe('GenerateShortUrlUseCase', () => {
  let sut: GenerateShortUrlUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const validOriginalUrlWithUserIdInput = ShortUrlObjectMother.withOutUserId();

  const validOriginalUrlWithOutUserIdInput =
    ShortUrlObjectMother.validUrlShortener();

  const invalidUrlOriginalUrlInput =
    ShortUrlObjectMother.withInvalidOriginalUrl();

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        generate: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [GenerateShortUrlUseCase, ShortUrlRepositoryProvider],
    }).compile();

    sut = app.get<GenerateShortUrlUseCase>(GenerateShortUrlUseCase);
    shortUrlRepository = app.get<ShortUrlRepository>(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should return notifications when URL is invalid', async () => {
      const output = await sut.execute(invalidUrlOriginalUrlInput);

      expect(output.shortUrl).toBeDefined();
      expect(output.shortUrl.notifications).toHaveLength(1);
      expect(shortUrlRepository.generate).not.toHaveBeenCalled();
    });

    it('should generate a short URL when input is valid and user id is provided', async () => {
      const output = await sut.execute(validOriginalUrlWithUserIdInput);

      expect(output.shortUrl).toBeDefined();
      expect(output.shortUrl.userId).toBeDefined();
      expect(output.shortUrl.shortUrl).toHaveLength(6);
      expect(output.shortUrl.notifications).toEqual([]);
    });

    it('should generate a short URL when input is valid and user id is not provided', async () => {
      const output = await sut.execute(validOriginalUrlWithOutUserIdInput);

      expect(output.shortUrl).toBeDefined();
      expect(output.shortUrl.userId).toBeDefined();
      expect(output.shortUrl.shortUrl).toHaveLength(6);
      expect(output.shortUrl.notifications).toEqual([]);
    });

    it('should call generate method of repository when URL is valid', async () => {
      await sut.execute(validOriginalUrlWithUserIdInput);

      expect(shortUrlRepository.generate).toHaveBeenCalled();
    });
  });
});
