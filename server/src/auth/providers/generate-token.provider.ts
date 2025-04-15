import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    sub: number,
    expiresIn: string,
    secret: string,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        user.id,
        this.jwtConfiguration.jwtExpiresIn,
        this.jwtConfiguration.jwtSecret,
        {
          email: user.email,
        },
      ),

      this.signToken(
        user.id,
        this.jwtConfiguration.jwtRefreshExpiresIn,
        this.jwtConfiguration.jwtRefreshSecret,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
