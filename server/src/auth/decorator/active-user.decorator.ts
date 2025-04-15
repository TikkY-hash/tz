import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

export const ActiveUser = createParamDecorator(
  (fields: keyof ActiveUserInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request[REQUEST_USER_KEY];

    return fields ? user[fields] : user;
  },
);
