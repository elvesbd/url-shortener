import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.usecase';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { User } from '@app/user/domain/user';
import { UserFoundException } from '@app/user/exceptions/user-found.exception';
import { RegisterUserOutput } from './types/register-user.output';
import { HashPassword } from '@app/user/ports/cryptography/encrypt.password';
import { UserObjectMother } from '@app/user/__mocks__/data-builder/user-object.mother';

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
      const expectedResult: RegisterUserOutput = {
        data: null,
        notifications: [
          'Password must be at least 8 characters long',
          'Password must contain at least one letter',
          'Password must contain at least one special character',
        ],
      };

      const result = await sut.execute(input);

      expect(user.hasNotifications).toBeTruthy();
      expect(result).toStrictEqual(expectedResult);
    });

    it('should call hash password with correct values', async () => {
      await sut.execute(input);

      expect(cryptography.hash).toHaveBeenCalledTimes(1);
      expect(cryptography.hash).toHaveBeenCalledWith(input.password);
    });

    it('should be register an use with success', async () => {
      const result = await sut.execute(input);

      expect(userRepository.register).toHaveBeenCalled();
      expect(userRepository.register).toHaveBeenCalledTimes(1);
      expect(result.data).toBeDefined();
      expect(result.notifications).toHaveLength(0);
    });
  });
});
