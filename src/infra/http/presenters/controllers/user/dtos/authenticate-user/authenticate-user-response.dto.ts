import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserResponseDto {
  @ApiProperty()
  accessToken: string;
}
