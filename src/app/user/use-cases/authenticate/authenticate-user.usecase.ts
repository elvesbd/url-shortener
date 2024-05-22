import { ComparePassword } from '@app/user/ports/cryptography/compare.password';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { SignToken } from '@app/user/ports/token/sign-token';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly cryptography: ComparePassword,
    private readonly userRepository: UserRepository,
    private readonly token: SignToken,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordIsValid = await this.cryptography.compare(
      password,
      user.password.value,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = {
      sub: user.id.value,
    };

    const accessToken = await this.token.signAsync(payload);

    return {
      accessToken,
    };
  }
}
