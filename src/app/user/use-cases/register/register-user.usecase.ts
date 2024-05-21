import { Injectable } from '@nestjs/common';
import { User } from '@app/user/domain/user';
import { UseCase } from '@app/shared/interfaces/UseCase';
import { UserFoundException } from '@app/user/exceptions/user-found.exception';
import { RegisterUserInput } from './types/register-user.input';
import { HasherPassword } from '@app/user/ports/hash/hash.password';
import { UserRepository } from '@app/user/ports/repository/user.repository';

type RegisterUserOutput = {
  data: User;
  notifications?: string[];
};

@Injectable()
export class RegisterUserUseCase
  implements UseCase<RegisterUserInput, RegisterUserOutput>
{
  constructor(
    private readonly hasher: HasherPassword,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const userFoundByEmail = await this.userRepository.findByEmail(input.email);

    if (userFoundByEmail) {
      throw new UserFoundException(input.email);
    }

    const password = await this.hasher.hashPassword(input.password);

    const user = User.create({
      ...input,
      password,
    });

    if (user.hasNotifications) {
      return {
        data: null,
        notifications: user.notifications,
      };
    }

    await this.userRepository.register(user);
    return {
      data: user,
      notifications: [],
    };
  }
}
