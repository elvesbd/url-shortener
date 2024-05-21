import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserResponseDto {
  @ApiProperty({
    type: 'string',
    readOnly: true,
    example: crypto.randomUUID(),
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Ds@5uGFl#',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
