import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PublicUserDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @Expose()
  email: string;
}
