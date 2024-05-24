import { ApiProperty } from '@nestjs/swagger';

export class UpdateDestinationUrlResponseDto {
  @ApiProperty({
    type: 'string',
    example: 'd93049aa-ed36-40a3-950c-84d2e4e4b1a3',
  })
  shortUrl: string;
}
