import { ApiProperty } from '@nestjs/swagger';

export class UpdateDestinationUrlResponseDto {
  @ApiProperty({
    type: 'string',
    example: 'http://localhost/aZbKq7',
  })
  shortUrl: string;
}
