import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description:
      'Password must include uppercase, lowercase, number, and symbol',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]).*$/,
    {
      message:
        'Password must contain upper/lowercase letters, numbers and symbols',
    },
  )
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be valid format like test@example.com',
  })
  @MinLength(6, { message: 'Email must be at least 6 characters' })
  @MaxLength(255, { message: 'Email must be at most 255 characters' })
  email: string;
}
