import { ApiProperty } from '@nestjs/swagger';

export class GetProjectDto {
  @ApiProperty({ example: 1, description: 'Project ID' })
  id: number;

  @ApiProperty({ example: 'facebook/react', description: 'GitHub repo path' })
  repoPath: string;

  @ApiProperty({ example: 'react', description: 'Repository name' })
  name: string;

  @ApiProperty({ example: 'facebook', description: 'Repository owner' })
  owner: string;

  @ApiProperty({
    example: 'https://github.com/facebook/react',
    description: 'Link to the GitHub repository',
  })
  url: string;

  @ApiProperty({ example: 205000, description: 'GitHub stars count' })
  stars: number;

  @ApiProperty({ example: 43000, description: 'GitHub forks count' })
  forks: number;

  @ApiProperty({ example: 1200, description: 'GitHub open issues count' })
  issues: number;

  @ApiProperty({
    example: 1699703615000,
    description: 'Repo creation time (UTC Unix timestamp)',
  })
  createdAt: number;

  @ApiProperty({
    example: 42,
    description: 'ID of the user who added the project',
  })
  userId: number;
}
