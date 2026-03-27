import type { PaginatedResponse } from '@/core/types/api';
import type { PaginationParams } from '@/core/types/search-params';
import type { Dummy } from '@/modules/dummies/types';

import { sleep } from '@/core/lib/utils';
import { getDummiesFromLocalStorage } from '@/modules/dummies/lib/utils';

export async function getAllDummies(): Promise<Dummy[]> {
  await sleep(100);

  return getDummiesFromLocalStorage();
}

export async function getDummiesList(
  paginationParams: PaginationParams,
): Promise<PaginatedResponse<Dummy>> {
  await sleep(150);

  const { page = 1, pageSize = 10 } = paginationParams;

  const dummies = getDummiesFromLocalStorage();

  return {
    items: dummies.slice((page - 1) * pageSize, page * pageSize),
    meta: {
      page,
      pageSize,
      total: dummies.length,
    },
  };
}

export async function getDummyById(id: number) {
  await sleep(150);

  return getDummiesFromLocalStorage().find((d) => d.id === id) || null;
}
