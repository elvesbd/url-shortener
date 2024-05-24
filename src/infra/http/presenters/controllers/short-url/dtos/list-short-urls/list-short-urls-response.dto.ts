import { ApiProperty } from '@nestjs/swagger';

export class ListShortUrlsResponseDto {
  @ApiProperty({ description: 'URL encurtada', example: 'http://short.ly/abc' })
  shortUrl: string;

  @ApiProperty({ description: 'Número de acessos', example: 0 })
  clicks: number;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2023-05-24T10:30:00Z',
  })
  updatedAt: Date;
}
