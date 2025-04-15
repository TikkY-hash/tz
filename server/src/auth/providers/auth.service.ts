import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { SingInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

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
