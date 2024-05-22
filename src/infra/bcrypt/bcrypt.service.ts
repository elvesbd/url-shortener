import { ComparePassword } from '@app/user/ports/cryptography/compare.password';
import { HashPassword } from '@app/user/ports/cryptography/encrypt.password';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type Cryptography = HashPassword & ComparePassword;

@Injectable()
export class BcryptService implements Cryptography {
  constructor() {}

  public hash(plainText: string, salt = 10): Promise<string> {
    return bcrypt.hash(plainText, salt);
  }

  public compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
