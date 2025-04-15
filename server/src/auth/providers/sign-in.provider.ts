import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindUserByEmailProvider } from 'src/users/providers/find-user-by-email.provider';

import { SignInDto } from '../dto/signin.dto';
import { BcryptProvider } from './bcrypt.provider';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SingInProvider {
  constructor(
    @Inject(forwardRef(() => FindUserByEmailProvider))
    private readonly findUserByEmailProvider: FindUserByEmailProvider,

    private readonly bcryptProvider: BcryptProvider,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.findUserByEmailProvider.findUserByEmail(signInDto.email);

    const invalidCredentialsError = new UnauthorizedException('Invalid email or password');

    if (!user) {
      throw invalidCredentialsError;
    }

    let isEqual = false;

    try {
      isEqual = await this.bcryptProvider.comparePassword(signInDto.password, user.password);
    } catch {
      throw new RequestTimeoutException('Something went wrong');
    }

    if (!isEqual) {
      throw invalidCredentialsError;
    }

    return await this.generateTokenProvider.generateTokens(user);
  }
}
