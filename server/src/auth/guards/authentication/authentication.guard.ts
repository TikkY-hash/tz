import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enums/auth-type.enum';

import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuard: Record<AuthType, CanActivate | CanActivate[]> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,

    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes: string[] = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getClass(),
      context.getHandler(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map(type => this.authTypeGuard[type]);

    const customError = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(instance.canActivate(context)).catch(() => {
        throw customError;
      });

      if (canActivate) return true;
    }

    throw customError;
  }
}
