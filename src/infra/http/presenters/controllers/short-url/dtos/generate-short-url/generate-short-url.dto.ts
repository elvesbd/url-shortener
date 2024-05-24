import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateShortUrlDto {
  @ApiProperty({
    type: 'string',
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  @IsNotEmpty()
  @IsString()
  originalUrl: string;
}
