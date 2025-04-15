import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/providers/users.service';

import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully. Returns access and refresh tokens',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR...',
      },
    },
  })
  public async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiOperation({ summary: 'Login user and receive access & refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR...',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  public async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RefreshTokenDto })
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Returns new access and refresh tokens',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR...',
      },
    },
  })
  @Auth(AuthType.None)
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  public async getRefreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.getTokens(refreshTokenDto);
  }
}
