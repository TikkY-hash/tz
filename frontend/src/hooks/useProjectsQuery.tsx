import { useInfiniteQuery } from '@tanstack/react-query';

import { getProjects } from '@/api/projects';
import { PROJECT_LIMIT } from '@/constants/main-constants';

export function useProjectsQuery(order: 'asc' | 'desc', search: string) {
  return useInfiniteQuery({
    queryKey: ['projects', { order, search }],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      const safePageParam = Math.max(pageParam, 1);
      return getProjects({
        order,
        search,
        page: safePageParam,
        limit: PROJECT_LIMIT,
      });
    },
    getNextPageParam: lastPage => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
