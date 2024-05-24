import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Redirect,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RedirectToOriginalUrlUseCase } from '@app/short-url/use-cases/redirect-origin-url';
import { ApiTag } from '../constants';

@ApiTags(ApiTag)
@Controller()
export class RedirectToOriginalUrlController {
  constructor(
    private readonly redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase,
  ) {}

  @ApiOperation({
    description: 'Redirect to the original URL using a shortened URL.',
  })
  @ApiParam({
    name: 'shortUrl',
    required: true,
    description: 'Shortened URL to register access to.',
  })
  @ApiNotFoundResponse({ description: 'Shortened URL not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Redirect()
  @Get(':shortUrl')
  public async redirectToOriginalUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ url: string }> {
    const originalUrl =
      await this.redirectToOriginalUrlUseCase.execute(shortUrl);

    return { url: originalUrl };
  }
}
