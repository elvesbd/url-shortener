import { GoneException } from '@nestjs/common';

export class ShortUrlDeletedException extends GoneException {
  constructor(message: string) {
    super(message);
  }
}
