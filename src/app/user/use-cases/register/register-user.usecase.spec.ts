import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.usecase';
import { HasherPassword } from '@app/user/ports/hash/hash.password';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { UserDataBuilder } from '@app/user/test/data-builder/user-data-builder';
import { User } from '@app/user/domain/user';

describe('RegisterUserUseCase', () => {
  let sut: RegisterUserUseCase;
  let hasher: HasherPassword;
  let userRepository: UserRepository;

  const userProps = UserDataBuilder.aUser().build();
  const user = User.create(userProps);

  beforeEach(async () => {
    jest.clearAllMocks();

    const HasherPasswordProvider = {
      provide: HasherPassword,
      useValue: {
        hashPassword: jest.fn().mockResolvedValue('hashPassword'),
      },
    };

    const UserRepositoryProvider = {
      provide: UserRepository,
      useValue: {
        findByEmail: jest.fn().mockResolvedValue(user),
        register: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        HasherPasswordProvider,
        UserRepositoryProvider,
      ],
    }).compile();

    sut = app.get<RegisterUserUseCase>(RegisterUserUseCase);
    hasher = app.get<HasherPassword>(HasherPassword);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(hasher).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
