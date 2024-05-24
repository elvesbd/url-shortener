import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPath, ApiTag } from '../constants';
import { RemoveShortUrlUseCase } from '@app/short-url/use-cases';
import { CurrentUserDto } from '@infra/http/auth/decorators/dto';
import { JwtAuthGuard } from '@infra/http/auth/strategies/jwt/jwt-auth.guard';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';

@ApiTags(ApiTag)
@ApiBearerAuth()
@Controller(ApiPath)
@UseGuards(JwtAuthGuard)
export class RemoveShortUrlController {
  constructor(
    private readonly removeShortenedUrlUseCase: RemoveShortUrlUseCase,
  ) {}

  @ApiOperation({ summary: 'Remove a shortened URL by shortUrl.' })
  @ApiParam({
    name: 'shortUrl',
    description: 'URL encurtada a ser removida',
    example: '4IgQcB',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':shortUrl')
  public async removeShortUrl(
    @Param('shortUrl') shortUrl: string,
    @CurrentUser() user: CurrentUserDto,
  ): Promise<void> {
    const { userId } = user;
    return await this.removeShortenedUrlUseCase.execute({
      shortUrl,
      userId,
    });
  }
}
