import { IntersectionType } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dto/pagination.dto';

class GetProjectBaseDto {
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  search?: string;
}

export class ProjectFiltersDto extends IntersectionType(GetProjectBaseDto, PaginationDto) {}
