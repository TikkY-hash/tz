import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  @IsString()
  password: string;
}
