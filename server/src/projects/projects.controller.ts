import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';

import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectDto } from './dto/get-project.dto';
import { PaginatedProjectsDto } from './dto/paginated-projects.dto';
import { ProjectFiltersDto } from './dto/project-filters.dto';
import { ProjectsService } from './providers/projects.service';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new GitHub repository' })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
    type: GetProjectDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Repository already added',
  })
  public create(@Body() createProjectDto: CreateProjectDto, @ActiveUser('sub') userId: number) {
    return this.projectsService.create(createProjectDto.repositoryPath, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects for the current user' })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by project name',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort by creation date',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Pagination: page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Pagination: items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects',
    type: PaginatedProjectsDto,
  })
  public findAll(@ActiveUser('sub') userId: number, @Query() projectFiltersDto: ProjectFiltersDto) {
    return this.projectsService.findAll(userId, projectFiltersDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID (owned by current user)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Project found',
    type: GetProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found or not yours' })
  public findOne(@Param('id', ParseIntPipe) id: number, @ActiveUser('sub') userId: number) {
    return this.projectsService.findOne(id, userId);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Refresh GitHub data for a specific project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Project successfully refreshed',
    type: GetProjectDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found or not yours' })
  public refresh(@Param('id', ParseIntPipe) id: number, @ActiveUser('sub') userId: number) {
    return this.projectsService.refresh(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Project deleted',
    schema: {
      example: { status: 'ok' },
    },
  })
  @ApiResponse({ status: 404, description: 'Project not found or not yours' })
  public remove(@Param('id', ParseIntPipe) id: number, @ActiveUser('sub') userId: number) {
    return this.projectsService.delete(id, userId);
  }
}
