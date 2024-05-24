import { ConfigService } from '@nestjs/config';
import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiGoneResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  UpdateDestinationUrlDto,
  UpdateDestinationUrlResponseDto,
} from '../dtos/update-destination-url';
import { ApiPath, ApiTag } from '../constants';
import { CurrentUserDto } from '@infra/http/auth/decorators/dto';
import { JwtAuthGuard } from '@infra/http/auth/strategies/jwt/jwt-auth.guard';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';
import { UpdateDestinationUrlUseCase } from '@app/short-url/use-cases/update-destination-url';
import { UpdateDestinationShortUrlViewModel } from '@infra/http/presenters/view-models/short-url';

@ApiTags(ApiTag)
@ApiBearerAuth()
@Controller(ApiPath)
@UseGuards(JwtAuthGuard)
export class UpdateDestinationUrlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly updateDestinationUrlUseCase: UpdateDestinationUrlUseCase,
  ) {}

  @ApiOperation({
    description: 'Update destination URL.',
  })
  @ApiBody({
    description: 'Properties to update the destination URL.',
    type: UpdateDestinationUrlDto,
    required: true,
  })
  @ApiOkResponse({
    description: 'Destination URL has been successfully updated.',
    type: UpdateDestinationUrlResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Shortened URL not found.' })
  @ApiUnauthorizedResponse({
    description: 'You are not authorized to edit this shortened URL.',
  })
  @ApiGoneResponse({
    description: 'The shortened URL has been deleted and cannot be updated.',
  })
  @Put(':shortUrl')
  public async updateDestinationUrl(
    @Body() body: UpdateDestinationUrlDto,
    @Param('shortUrl') shortUrl: string,
    @CurrentUser() user: CurrentUserDto,
  ): Promise<UpdateDestinationUrlResponseDto> {
    const { userId } = user;
    const { urlShortener } = await this.updateDestinationUrlUseCase.execute({
      ...body,
      shortUrl,
      userId,
    });

    return UpdateDestinationShortUrlViewModel.toHTTP(
      urlShortener,
      this.configService,
    );
  }
}
