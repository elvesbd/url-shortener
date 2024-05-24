import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { ShortUrlObjectMother } from '@app/short-url/__mocks__/data-builder/short-url-object.mother';
import { ListShortUrlsUseCase } from './list-short-urls.usecase';
import { ListShortUrlsInput } from './types/list-short-urls.input';
import { ShortUrl } from '@app/short-url/domain/short-url';

describe('ListShortUrlsUseCase', () => {
  let sut: ListShortUrlsUseCase;
  let shortUrlRepository: ShortUrlRepository;

  const shortUrlProps = ShortUrlObjectMother.validUrlShortener();
  const shortUrl = ShortUrl.create(shortUrlProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const ShortUrlRepositoryProvider = {
      provide: ShortUrlRepository,
      useValue: {
        findAllByUserId: jest.fn().mockResolvedValue([shortUrl]),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [ListShortUrlsUseCase, ShortUrlRepositoryProvider],
    }).compile();

    sut = app.get<ListShortUrlsUseCase>(ListShortUrlsUseCase);
    shortUrlRepository = app.get<ShortUrlRepository>(ShortUrlRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('execute', () => {
    const input: ListShortUrlsInput = {
      userId: 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3',
    };
    it('should return an empty array when there are no short urls available for the user', async () => {
      jest.spyOn(shortUrlRepository, 'findAllByUserId').mockResolvedValue([]);

      const result = await sut.execute(input);

      expect(result.urlsShort).toEqual([]);
    });

    it('should return short urls when there are urls available for the user', async () => {
      const result = await sut.execute(input);

      expect(result.urlsShort).toStrictEqual([shortUrl]);
    });
  });
});
