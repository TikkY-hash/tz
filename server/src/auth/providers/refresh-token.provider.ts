import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/providers/users.service';

import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.jwtRefreshSecret,
      });

      const user = await this.userService.findOneWithPassword(sub);

      return await this.generateTokenProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
