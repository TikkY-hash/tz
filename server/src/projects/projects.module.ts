import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './providers/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { GitHubProvider } from './providers/github.provider';
import { ConfigModule } from '@nestjs/config';
import githubConfig from 'src/config/github.config';
import { PaginationModule } from 'src/common/pagination/pagination.module';

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
