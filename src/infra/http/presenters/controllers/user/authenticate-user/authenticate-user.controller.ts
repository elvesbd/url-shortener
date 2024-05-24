import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticateUserDto, AuthenticateUserResponseDto } from '../dtos';
import { AuthenticateUserUseCase } from '@app/user/use-cases/authenticate';

@ApiTags('users')
@Controller('users')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @ApiOperation({
    description: 'Authenticate user with email and password.',
  })
  @ApiBody({
    type: AuthenticateUserDto,
    description: 'User credentials for authentication.',
  })
  @ApiOkResponse({
    description: 'User authenticated successfully.',
    type: AuthenticateUserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @Post('authenticate')
  public async authenticateUser(
    @Body() body: AuthenticateUserDto,
  ): Promise<AuthenticateUserResponseDto> {
    const accessToken = await this.authenticateUserUseCase.execute(body);

    return accessToken;
  }
}
