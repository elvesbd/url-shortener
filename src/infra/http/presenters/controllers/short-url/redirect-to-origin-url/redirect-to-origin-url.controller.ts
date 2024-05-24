import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Redirect,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RedirectToOriginalUrlUseCase } from '@app/short-url/use-cases/redirect-origin-url';

@ApiTags('url')
@Controller('url')
export class RedirectToOriginalUrlController {
  constructor(
    private readonly redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase,
  ) {}

  @ApiOperation({ description: 'Register access to a shortened URL.' })
  @ApiQuery({
    name: 'shortUrl',
    required: true,
    description: 'Shortened URL to register access to.',
  })
  @ApiNoContentResponse({
    description:
      'Access to the shortened URL has been registered successfully.',
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
