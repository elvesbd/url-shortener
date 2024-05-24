import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthenticateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character',
  })
  @ApiProperty()
  password: string;
}
