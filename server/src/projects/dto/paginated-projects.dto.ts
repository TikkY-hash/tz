import { ApiProperty } from '@nestjs/swagger';

import { GetProjectDto } from './get-project.dto';
import { PaginationResponseDto } from './paginated-response.dto';

export class PaginatedProjectsDto {
  @ApiProperty({ type: [GetProjectDto] })
  data: GetProjectDto[];

  @ApiProperty({ type: PaginationResponseDto })
  meta: PaginationResponseDto;
}
