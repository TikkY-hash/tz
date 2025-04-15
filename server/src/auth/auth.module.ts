import { forwardRef, Module } from '@nestjs/common';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { SingInProvider } from './providers/sign-in.provider';
import { AuthService } from './providers/auth.service';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule,
    ConfigModule.forFeature(jwtConfig),
  ],
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
