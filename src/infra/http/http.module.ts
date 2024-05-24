import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShortUrlRepository } from '@app/short-url/ports';
import { SignToken } from '@app/user/ports/token/sign-token';
import { DatabaseModule } from '@infra/database/database.module';
import {
  AuthenticateUserUseCase,
  RegisterUserUseCase,
} from '@app/user/use-cases';
import {
  GenerateShortUrlUseCase,
  ListShortUrlsUseCase,
  RedirectToOriginalUrlUseCase,
  RemoveShortUrlUseCase,
  UpdateDestinationUrlUseCase,
} from '@app/short-url/use-cases';
import {
  GenerateShortUrlController,
  ListShortUrlController,
  RedirectToOriginalUrlController,
  RemoveShortUrlController,
  UpdateDestinationUrlController,
} from '@infra/http/presenters/controllers/short-url';
import {
  AuthenticateUserController,
  RegisterUserController,
} from '@infra/http/presenters/controllers/user';
import { ComparePassword, HashPassword, UserRepository } from '@app/user/ports';
import { AppHealthController } from '@infra/http/presenters/controllers/health-check';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    {
      provide: GenerateShortUrlUseCase,
      useFactory: (
        shortUrlRepository: ShortUrlRepository,
      ): GenerateShortUrlUseCase =>
        new GenerateShortUrlUseCase(shortUrlRepository),
      inject: [ShortUrlRepository],
    },
    {
      provide: UpdateDestinationUrlUseCase,
      useFactory: (
        shortUrlRepository: ShortUrlRepository,
      ): UpdateDestinationUrlUseCase =>
        new UpdateDestinationUrlUseCase(shortUrlRepository),
      inject: [ShortUrlRepository],
    },
    {
      provide: ListShortUrlsUseCase,
      useFactory: (
        shortUrlRepository: ShortUrlRepository,
      ): ListShortUrlsUseCase => new ListShortUrlsUseCase(shortUrlRepository),
      inject: [ShortUrlRepository],
    },
    {
      provide: RemoveShortUrlUseCase,
      useFactory: (
        shortUrlRepository: ShortUrlRepository,
      ): RemoveShortUrlUseCase => new RemoveShortUrlUseCase(shortUrlRepository),
      inject: [ShortUrlRepository],
    },
    {
      provide: RedirectToOriginalUrlUseCase,
      useFactory: (
        shortUrlRepository: ShortUrlRepository,
      ): RedirectToOriginalUrlUseCase =>
        new RedirectToOriginalUrlUseCase(shortUrlRepository),
      inject: [ShortUrlRepository],
    },
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        cryptography: ComparePassword,
        userRepository: UserRepository,
        token: SignToken,
      ): AuthenticateUserUseCase =>
        new AuthenticateUserUseCase(cryptography, userRepository, token),
      inject: [ComparePassword, UserRepository, SignToken],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        cryptography: HashPassword,
        userRepository: UserRepository,
      ): RegisterUserUseCase =>
        new RegisterUserUseCase(cryptography, userRepository),
      inject: [ComparePassword, UserRepository],
    },
  ],
  controllers: [
    AppHealthController,
    RegisterUserController,
    AuthenticateUserController,
    ListShortUrlController,
    RemoveShortUrlController,
    GenerateShortUrlController,
    UpdateDestinationUrlController,
    RedirectToOriginalUrlController,
  ],
})
export class HttpModule {}
