import type { PaginationParams } from '@/core/types/search-params';

import { queryOptions } from '@tanstack/react-query';

import { getDummiesList, getDummyById } from '@/modules/dummies/api/query-fns';

export const dummiesIndexQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: ['dummies', params],
    queryFn: () => getDummiesList(params),
  });

export const dummyQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['dummyById', itemId],
    queryFn: () => getDummyById(itemId),
  });
