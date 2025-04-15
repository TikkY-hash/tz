import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private extractToken(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.jwtSecret,
      });

      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
