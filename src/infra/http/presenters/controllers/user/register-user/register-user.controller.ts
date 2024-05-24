import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiConflictResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RegisterUserDto, RegisterUserResponseDto } from '../dtos';
import { RegisterUserUseCase } from '@app/user/use-cases/register';
import { RegisterUserViewModel } from '@infra/http/presenters/view-models/user';
import { ApiPath, ApiTag } from '../constants';

@ApiTags(ApiTag)
@Controller(ApiPath)
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @ApiOperation({
    description: 'Register a new user.',
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'User data for registration.',
  })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: RegisterUserResponseDto,
  })
  @ApiConflictResponse({
    description: 'User with the same email already exists.',
  })
  @ApiUnprocessableEntityResponse({ description: 'Business rule violations.' })
  @Post('register')
  public async registerUser(
    @Body() body: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const { user } = await this.registerUserUseCase.execute(body);

    return RegisterUserViewModel.toHTTP(user);
  }
}
