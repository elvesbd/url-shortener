import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { User } from '@app/user/domain/user';
import { ComparePassword } from '@app/user/ports/cryptography/compare.password';
import { SignToken } from '@app/user/ports/token/sign-token';
import { AuthenticateUserUseCase } from './authenticate-user.usecase';
import { UnauthorizedException } from '@nestjs/common';
import { UserObjectMother } from '@app/user/__mocks__/data-builder/user-object.mother';

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase;
  let cryptography: ComparePassword;
  let userRepository: UserRepository;
  let token: SignToken;

  const { name, email, password } = UserObjectMother.user();
  const user = User.create({ name, email, password });

  beforeEach(async () => {
    jest.clearAllMocks();

    const ComparePasswordProvider = {
      provide: ComparePassword,
      useValue: {
        compare: jest.fn().mockResolvedValue(true),
      },
    };

    const UserRepositoryProvider = {
      provide: UserRepository,
      useValue: {
        findByEmail: jest.fn().mockResolvedValue(user),
      },
    };

    const SignTokenProvider = {
      provide: SignToken,
      useValue: {
        signAsync: jest.fn().mockResolvedValue('accessToken'),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUserUseCase,
        ComparePasswordProvider,
        UserRepositoryProvider,
        SignTokenProvider,
      ],
    }).compile();

    sut = app.get<AuthenticateUserUseCase>(AuthenticateUserUseCase);
    cryptography = app.get<ComparePassword>(ComparePassword);
    userRepository = app.get<UserRepository>(UserRepository);
    token = app.get<SignToken>(SignToken);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(cryptography).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(token).toBeDefined();
  });

  describe('execute', () => {
    it('should call find by email with correct values', async () => {
      await sut.execute({ email, password });

      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);

      await expect(sut.execute({ email, password })).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is not valid', async () => {
      jest.spyOn(cryptography, 'compare').mockResolvedValueOnce(false);

      await expect(sut.execute({ email, password })).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should call compare password with correct values', async () => {
      await sut.execute({ email, password });

      expect(cryptography.compare).toHaveBeenCalledTimes(1);
      expect(cryptography.compare).toHaveBeenCalledWith(
        password,
        user.password.value,
      );
    });

    it('should call sign token with correct values', async () => {
      await sut.execute({ email, password });

      expect(token.signAsync).toHaveBeenCalledTimes(1);
      expect(token.signAsync).toHaveBeenCalledWith({ sub: user.id.value });
    });

    it('should be register an use with success', async () => {
      const result = await sut.execute({ email, password });

      expect(result).toStrictEqual({
        accessToken: 'accessToken',
      });
    });
  });
});
