/**
 * Specifies the type for the fetch request body for getAllItems request.
 */
export type PaginationData = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

export type PaginatedResponse<T> = {
  items: Array<T>;
  meta: PaginationData;
};

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
