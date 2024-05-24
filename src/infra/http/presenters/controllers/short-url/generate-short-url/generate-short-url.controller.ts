import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';
import { GenerateShortUrlUseCase } from '@app/short-url/use-cases/generate-short-url';
import {
  GenerateShortUrlDto,
  GenerateShortUrlResponseDto,
} from '../dtos/generate-short-url';
import { CurrentUserDto } from '@infra/http/auth/decorators/dto';
import { GenerateUrlShortViewModel } from '@infra/http/presenters/view-models/short-url';
import { ApiPath, ApiTag } from '../constants';

@ApiBearerAuth()
@ApiTags(ApiTag)
@Controller(ApiPath)
export class GenerateShortUrlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly generateShortUrlUseCase: GenerateShortUrlUseCase,
  ) {}

  @ApiOperation({
    description: 'Generate a new short url.',
  })
  @ApiBody({
    description: 'Properties to create a short url.',
    type: GenerateShortUrlDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'A short url has been successfully generated.',
    type: GenerateShortUrlResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid input or validation errors.',
  })
  @Post('shorten')
  public async generateShortUrl(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: GenerateShortUrlDto,
  ): Promise<GenerateShortUrlResponseDto> {
    const userId = user?.userId;
    const { shortUrl } = await this.generateShortUrlUseCase.execute({
      ...body,
      userId,
    });

    return GenerateUrlShortViewModel.toHTTP(shortUrl, this.configService);
  }
}
