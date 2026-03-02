import type { PaginatedResponse } from '@/core/types/fetch';
import type { Dummy } from '@/modules/dummies/types';

import { dummies } from '@/modules/dummies/data/mock';

export function getAllDummies(): Promise<Dummy[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummies), 500);
  });
}

export function getDummiesList({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
} = {}): Promise<PaginatedResponse<Dummy>> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          items: dummies.slice((page - 1) * pageSize, page * pageSize),
          meta: {
            page,
            pageSize,
            total: dummies.length,
          },
        }),
      500,
    );
  });
}
