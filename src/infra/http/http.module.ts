import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SignToken } from '@app/user/ports/token/sign-token';
import { DatabaseModule } from '@infra/database/database.module';
import { RegisterUserUseCase } from '@app/user/use-cases/register';
import { AuthenticateUserUseCase } from '@app/user/use-cases/authenticate';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { HashPassword } from '@app/user/ports/cryptography/encrypt.password';
import { ListShortUrlsUseCase } from '@app/short-url/use-cases/list-short-urls';
import { ComparePassword } from '@app/user/ports/cryptography/compare.password';
import { RemoveShortUrlUseCase } from '@app/short-url/use-cases/remove-short-url';
import { RegisterUserController } from './presenters/controllers/user/register-user';
import { GenerateShortUrlUseCase } from '@app/short-url/use-cases/generate-short-url';
import { ShortUrlRepository } from '@app/short-url/ports/repository/short-url.repository';
import { RedirectToOriginalUrlUseCase } from '@app/short-url/use-cases/redirect-origin-url';
import { AuthenticateUserController } from './presenters/controllers/user/authenticate-user';
import { UpdateDestinationUrlUseCase } from '@app/short-url/use-cases/update-destination-url';
import { ListShortUrlController } from './presenters/controllers/short-url/list-short-urls/list-short-urls.controller';
import { RemoveShortUrlController } from './presenters/controllers/short-url/remove-short-url/remove-short-url.controller';
import { GenerateShortUrlController } from './presenters/controllers/short-url/generate-short-url/generate-short-url.controller';
import { UpdateDestinationUrlController } from './presenters/controllers/short-url/update-destination-url/update-destination-url.controller';
import { RedirectToOriginalUrlController } from './presenters/controllers/short-url/redirect-to-origin-url/redirect-to-origin-url.controller';

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
