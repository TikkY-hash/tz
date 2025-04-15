import { Injectable } from '@nestjs/common';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

import { PaginationDto } from '../dto/pagination.dto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationDto,
    repository: Repository<T>,
    options?: FindManyOptions<T>,
  ): Promise<Paginated<T>> {
    const totalItems = await repository.count(options);
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);

    const findOptions: FindManyOptions<T> = {
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
      ...options,
    };

    const results = await repository.find(findOptions);

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
    };

    return finalResponse;
  }
}
