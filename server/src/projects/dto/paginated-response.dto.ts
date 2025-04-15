import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;
}
