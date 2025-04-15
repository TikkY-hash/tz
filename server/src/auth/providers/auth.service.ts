import { Injectable } from '@nestjs/common';

import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignInDto } from '../dto/signin.dto';
import { RefreshTokenProvider } from './refresh-token.provider';
import { SingInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SingInProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async getTokens(refreshToken: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshToken);
  }
}
