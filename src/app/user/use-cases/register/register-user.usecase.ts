import { Injectable } from '@nestjs/common';
import { User } from '@app/user/domain/user';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { UserFoundException } from '@app/user/exceptions/user-found.exception';
import { RegisterUserInput } from './types/register-user.input';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { HashPassword } from '@app/user/ports/cryptography/encrypt.password';

type RegisterUserOutput = {
  data: User;
  notifications?: string[];
};

@Injectable()
export class RegisterUserUseCase
  implements UseCase<RegisterUserInput, RegisterUserOutput>
{
  constructor(
    private readonly cryptography: HashPassword,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const { name, email, password } = input;
    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new UserFoundException(email);
    }

    const user = User.create({
      name,
      email,
      password,
    });

    if (user.hasNotifications) {
      return {
        data: null,
        notifications: user.notifications,
      };
    }

    const hash = await this.cryptography.hash(password);
    user.setPasswordWithHash(hash);

    await this.userRepository.register(user);
    return {
      data: user,
      notifications: [],
    };
  }
}
