import { Payload } from '@app/user/ports/token/sign-token';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  public signAsync(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
