import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/user/domain';
import { RegisterUserUseCase } from '@app/user/use-cases';
import { UserFoundException } from '@app/user/exceptions';
import { HashPassword, UserRepository } from '@app/user/ports';
import { UserObjectMother } from '@app/user/__mocks__/data-builder';

describe('RegisterUserUseCase', () => {
  let sut: RegisterUserUseCase;
  let cryptography: HashPassword;
  let userRepository: UserRepository;

  const input = UserObjectMother.user();

  beforeEach(async () => {
    jest.clearAllMocks();

    const HashPasswordProvider = {
      provide: HashPassword,
      useValue: {
        hash: jest
          .fn()
          .mockResolvedValue(
            '$2a$12$nsE/R/UozqXEQjn22pRTr.KZCwacqvGiN91Rh/o/SNmSzYc12ZowG',
          ),
      },
    };

    const UserRepositoryProvider = {
      provide: UserRepository,
      useValue: {
        findByEmail: jest.fn().mockResolvedValue(null),
        register: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        HashPasswordProvider,
        UserRepositoryProvider,
      ],
    }).compile();

    sut = app.get<RegisterUserUseCase>(RegisterUserUseCase);
    cryptography = app.get<HashPassword>(HashPassword);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(cryptography).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call find by email with correct values', async () => {
      await sut.execute(input);

      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    });

    it('should throw UserFoundException if user already exists', async () => {
      const user = User.create(input);

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user);

      await expect(sut.execute(input)).rejects.toThrow(UserFoundException);
    });

    it('should generate notifications for invalid user ID length', async () => {
      const input = UserObjectMother.withInvalidIdLength();
      const user = User.create(input);

      const result = await sut.execute(input);

      expect(user.hasNotifications).toBeTruthy();
      expect(result.user.notifications).toStrictEqual([
        'Password must be at least 8 characters long',
      ]);
    });

    it('should call hash password with correct values', async () => {
      await sut.execute(input);

      expect(cryptography.hash).toHaveBeenCalledTimes(1);
      expect(cryptography.hash).toHaveBeenCalledWith(input.password);
    });

    it('should be register an use with success', async () => {
      const result = await sut.execute(input);

      expect(result.user).toBeDefined();
      expect(userRepository.register).toHaveBeenCalled();
      expect(userRepository.register).toHaveBeenCalledTimes(1);
    });
  });
});
