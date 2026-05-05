import type { RequestDataRecord } from '@/core/types/request';

import { MissingIdError } from '@/core/errors';
import projectConfig from '@/project.config';

export function buildUrl(path: string, query?: RequestDataRecord): string {
  const base = projectConfig.baseApi.url.replace(/\/$/, '');
  const apiPath = projectConfig.baseApi.path
    .replace(/^\//, '')
    .replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${base}/${apiPath}${normalizedPath}`;

  if (!query || Object.keys(query).length === 0) return url;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    params.set(key, String(value));
  }

  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

export function assertValidId(
  id: string | number | undefined,
  path: string,
): asserts id is string | number {
  if (id === undefined || id === null || id === '') {
    throw new MissingIdError(path);
  }
}

/** Routes starting with /auth never get an Authorization header attached. */
export function isLoginPath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.startsWith('/auth/login');
}
