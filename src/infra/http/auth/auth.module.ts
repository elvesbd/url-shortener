import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JWTService } from './jwt-service/jwt.service';
import { BcryptService } from './bcrypt/bcrypt.service';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { ComparePassword, SignToken } from '@app/user/ports';
import { JwtKeyService } from './decorators/current-user.decorator';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: '3600s', //30m
        },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    JwtKeyService,
    {
      provide: ComparePassword,
      useClass: BcryptService,
    },
    {
      provide: SignToken,
      useClass: JWTService,
    },
  ],
  exports: [JwtStrategy, ComparePassword, SignToken],
})
export class AuthModule {}
