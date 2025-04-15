import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'facebook/react',
    description: 'GitHub repository path in the format "owner/repo".',
  })
  @IsString()
  @Matches(/^[^/]+\/[^/]+$/, {
    message: 'Repository path must be in the format "owner/repo"',
  })
  repositoryPath: string;
}
