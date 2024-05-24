import { ApiProperty } from '@nestjs/swagger';

export class GenerateShortUrlResponseDto {
  @ApiProperty({
    type: 'string',
    example: 'http://localhost/dRyyMb',
  })
  shortUrl: string;
}
