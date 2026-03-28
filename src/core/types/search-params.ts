import { z } from 'zod';

import { DEFAULT_PAGE_SIZES } from '@/core/constants/search-params';

export const paginationSearchSchema = z.object({
  page: z.number().min(1).catch(1),
  pageSize: z.literal(DEFAULT_PAGE_SIZES).catch(10),
});

export type PaginationSearchParams = z.infer<typeof paginationSearchSchema>;
export type PaginationPageSize = (typeof DEFAULT_PAGE_SIZES)[number];
