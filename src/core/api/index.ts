import type { GetOptions, MutationOptions } from '@/core/types/request';
import type { PaginatedResponse, PaginationData } from '@/core/types/response';

import { request } from '@/core/api/request';
import { assertValidId } from '@/core/lib/request';

// -------------------------------------------------------------------------
// Generic methods
// -------------------------------------------------------------------------

function get<TData>(path: string, options?: GetOptions): Promise<TData> {
  return request<TData>('GET', path, options);
}

function post<TData>(path: string, options?: MutationOptions): Promise<TData> {
  return request<TData>('POST', path, options);
}

function put<TData>(path: string, options?: MutationOptions): Promise<TData> {
  return request<TData>('PUT', path, options);
}

function patch<TData>(path: string, options?: MutationOptions): Promise<TData> {
  return request<TData>('PATCH', path, options);
}

function deleteRequest<TData>(
  path: string,
  options?: GetOptions,
): Promise<TData> {
  return request<TData>('DELETE', path, options);
}

// -------------------------------------------------------------------------
// List (paginated)
// -------------------------------------------------------------------------

async function getList<TData>(
  path: string,
  options?: GetOptions,
): Promise<PaginatedResponse<TData>> {
  // Most APIs return paginated data in a { data: TData[], meta: PaginationData } format, so we need to transform it to our PaginatedResponse<TData> format.
  const res = await request<{ data: TData[]; meta: PaginationData }>(
    'GET',
    path,
    options,
  );

  return { items: res.data, meta: res.meta } as PaginatedResponse<TData>;
}

// -------------------------------------------------------------------------
// ById methods
// -------------------------------------------------------------------------

function getById<TData>(
  path: string,
  id: string | number | undefined,
  options?: GetOptions,
): Promise<TData> {
  assertValidId(id, path);
  return get<TData>(`${path}/${id}`, options);
}

function postById<TData>(
  path: string,
  id: string | number | undefined,
  options?: MutationOptions,
): Promise<TData> {
  assertValidId(id, path);
  return post<TData>(`${path}/${id}`, options);
}

function putById<TData>(
  path: string,
  id: string | number | undefined,
  options?: MutationOptions,
): Promise<TData> {
  assertValidId(id, path);
  return put<TData>(`${path}/${id}`, options);
}

function patchById<TData>(
  path: string,
  id: string | number | undefined,
  options?: MutationOptions,
): Promise<TData> {
  assertValidId(id, path);
  return patch<TData>(`${path}/${id}`, options);
}

function deleteById<TData>(
  path: string,
  id: string | number | undefined,
  options?: GetOptions,
): Promise<TData> {
  assertValidId(id, path);
  return deleteRequest<TData>(`${path}/${id}`, options);
}

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
  getList,
  getById,
  postById,
  putById,
  patchById,
  deleteById,
};
