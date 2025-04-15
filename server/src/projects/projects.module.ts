import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import githubConfig from 'src/config/github.config';

import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { GitHubProvider } from './providers/github.provider';
import { ProjectsService } from './providers/projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, GitHubProvider],
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Project]),
    ConfigModule.forFeature(githubConfig),
  ],
})
export class ProjectsModule {}
