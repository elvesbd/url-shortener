import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPath, ApiTag } from '../constants';
import { ListShortUrlsResponseDto } from '../dtos/list-short-urls';
import { JwtAuthGuard } from '@infra/http/auth/strategies/jwt/jwt-auth.guard';
import { ListShortUrlsUseCase } from '@app/short-url/use-cases/list-short-urls';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';
import { ListShortUrlsViewModel } from '@infra/http/presenters/view-models/short-url';
import { CurrentUserDto } from '@infra/http/auth/decorators/dto';

@ApiTags(ApiTag)
@ApiBearerAuth()
@Controller(ApiPath)
@UseGuards(JwtAuthGuard)
export class ListShortUrlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly listShortenerUrlsUseCase: ListShortUrlsUseCase,
  ) {}

  @ApiOperation({ description: 'List all shortened URLs for a user.' })
  @ApiQuery({ name: 'userId', required: true, description: 'ID do usuário' })
  @ApiOkResponse({
    description: 'List of shortened URLs retrieved successfully.',
    type: ListShortUrlsResponseDto,
  })
  @Get('user')
  public async updateDestinationUrl(
    @CurrentUser() user: CurrentUserDto,
  ): Promise<ListShortUrlsResponseDto[]> {
    const { userId } = user;
    const { urlsShort } = await this.listShortenerUrlsUseCase.execute({
      userId,
    });

    return ListShortUrlsViewModel.toHTTP(urlsShort, this.configService);
  }
}
