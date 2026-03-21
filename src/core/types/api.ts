import { z } from 'zod';

import { DEFAULT_PAGE_SIZES } from '@/core/constants/api';

export const paginationParamsSchema = z.object({
  page: z.number().min(1).catch(1),
  pageSize: z.literal(DEFAULT_PAGE_SIZES).catch(10),
});

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type CommonDataRecord = Record<string, JSONValue | Date>;

/**
 * Specifies the type for the fetch request body for getAllItems request.
 */
export type PaginatedResponse<T> = {
  items: Array<T>;
  meta: {
    page: number;
    pageSize: number;
    total: number;
    lastPage?: number | null;
    next?: string | null;
    prev?: string | null;
  };
};

export type PaginationParams = z.infer<typeof paginationParamsSchema>;
export type PaginationPageSize = (typeof DEFAULT_PAGE_SIZES)[number];

/** RFC9457 Problem Details for HTTP APIs */
export type ProblemDetails = {
  type?: string;
  status?: number;
  title: string;
  detail: string;
  instance?: string;

  // Optional fields for additional error information
  code?: string;
  errors?:
    | Array<Record<string, string>>
    // Just for .NET compatibility
    | Record<string, Array<string>>;
};
