import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { SingInProvider } from './providers/sign-in.provider';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule, ConfigModule.forFeature(jwtConfig)],
  controllers: [AuthController],
  providers: [
    BcryptProvider,
    GenerateTokenProvider,
    SingInProvider,
    RefreshTokenProvider,
    AuthService,
    AccessTokenGuard,
  ],
  exports: [BcryptProvider, GenerateTokenProvider, AccessTokenGuard],
})
export class AuthModule {}
