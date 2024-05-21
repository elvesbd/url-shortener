import { RegisterUserUseCase } from '@app/user/use-cases/register/register-user.usecase';
import { RegisterUserResponseDto } from '@infra/http/dtos/user/register/register-user-response.dto';
import { RegisterUserDto } from '@infra/http/dtos/user/register/register-user.dto';
import {
  UserVMResponse,
  UserViewModel,
} from '@infra/http/presenters/view-models/user.view-model';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @ApiOperation({
    description: 'Register a new User.',
  })
  @ApiBody({
    description: 'Properties to register a User.',
    type: RegisterUserDto,
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'A User has already been registered with given email.',
  })
  @ApiCreatedResponse({
    description: 'A User has been successfully registered.',
    type: RegisterUserResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  //@UseInterceptors(JWTTokenInterceptor)
  public async createUserRoute(
    @Body() body: RegisterUserDto,
  ): Promise<UserVMResponse> {
    const result = await this.registerUserUseCase.execute(body);

    return UserViewModel.toHTTP(result);
  }
}
