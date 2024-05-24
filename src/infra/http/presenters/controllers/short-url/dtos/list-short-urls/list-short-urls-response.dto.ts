import { ApiProperty } from '@nestjs/swagger';

export class ListShortUrlsResponseDto {
  @ApiProperty({ description: 'URL encurtada', example: 'http://short.ly/abc' })
  shortUrl: string;

  @ApiProperty({ description: 'Número de acessos', example: 0 })
  accessCount: number;
}
