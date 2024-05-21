import { BadRequestException } from '@nestjs/common';

export class UserFoundException extends BadRequestException {
  constructor(email: string) {
    super(`User already exists with email "${email}".`);
  }
}
