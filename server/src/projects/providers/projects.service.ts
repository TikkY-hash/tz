import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Project } from '../entities/project.entity';
import { GitHubProvider } from './github.provider';
import { ProjectFiltersDto } from '../dto/project-filters.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { GetProjectDto } from '../dto/get-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    private readonly githubProvider: GitHubProvider,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async create(
    repoPath: string,
    userId: number,
  ): Promise<GetProjectDto> {
    const repo = await this.projectRepo.findOneBy({
      repoPath,
      userId,
    });

    if (repo) {
      throw new ConflictException('This repo is already added by you');
    }

    const data = await this.githubProvider.fetchRepoData(repoPath);

    const project = this.projectRepo.create({
      repoPath,
      name: data.name,
      owner: data.owner,
      url: data.url,
      stars: data.stars,
      forks: data.forks,
      issues: data.issues,
      createdAt: data.createdAt,
      userId,
    });

    return await this.projectRepo.save(project);
  }

  public async findAll(
    userId: number,
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<Paginated<GetProjectDto>> {
    const order: 'ASC' | 'DESC' =
      projectFiltersDto.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const where: FindOptionsWhere<Project> = { userId };

    if (projectFiltersDto.search) {
      where.name = ILike(`%${projectFiltersDto.search}%`);
    }

    return await this.paginationProvider.paginationQuery(
      projectFiltersDto,
      this.projectRepo,
      {
        where,
        order: { createdAt: order },
      },
    );
  }

  public async findOne(id: number, userId: number): Promise<Project> {
    const project = await this.projectRepo.findOneBy({ id, userId });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  public async refresh(id: number, userId: number): Promise<Project> {
    const project = await this.projectRepo.findOneBy({ id, userId });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const data = await this.githubProvider.fetchRepoData(project.repoPath);

    await this.projectRepo.update(id, {
      stars: data.stars,
      forks: data.forks,
      issues: data.issues,
    });

    return await this.projectRepo.findOneBy({ id, userId });
  }

  public async delete(
    id: number,
    userId: number,
  ): Promise<{
    status: 'ok';
  }> {
    const result = await this.projectRepo.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException('Project not found or access denied');
    }

    return {
      status: 'ok',
    };
  }
}
