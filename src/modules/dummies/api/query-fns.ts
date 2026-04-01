import type { PaginatedResponse } from '@/core/types/api';
import type {
  DummiesSearchParams,
  Dummy,
  DummyFormData,
} from '@/modules/dummies/types';

import { isStringValid, sleep } from '@/core/lib/utils';
import { getDummiesFromLocalStorage } from '@/modules/dummies/lib/utils';

export async function getAllDummies(): Promise<Dummy[]> {
  await sleep(100);

  return getDummiesFromLocalStorage();
}

export async function getDummiesList(
  dummiesSearchParams: DummiesSearchParams,
): Promise<PaginatedResponse<Dummy>> {
  await sleep(150);
  const dummies = getDummiesFromLocalStorage();

  const { page = 1, pageSize = 10, search, status } = dummiesSearchParams;

  const cleanSearch = search?.trim().toLowerCase();

  const filteredDummies = dummies
    .filter(
      (d) =>
        !isStringValid(cleanSearch) ||
        d.name.toLowerCase().includes(cleanSearch!) ||
        d.email.toLowerCase().includes(cleanSearch!),
    )
    .filter((d) => !status || d.status === status);

  return {
    items: filteredDummies.slice((page - 1) * pageSize, page * pageSize),
    meta: {
      page,
      pageSize,
      total: filteredDummies.length,
    },
  };
}

export async function getDummyById(id: number) {
  await sleep(150);

  return getDummiesFromLocalStorage().find((d) => d.id === id) || null;
}

export async function createDummy(dummy: DummyFormData) {
  await sleep(150);

  const dummies = getDummiesFromLocalStorage();

  const newDummy: Dummy = {
    ...dummy,
    id: Math.max(...dummies.map((d) => d.id)),
    created_at: new Date().toString(),
  };

  dummies.unshift(newDummy);
  localStorage.setItem('dummies', JSON.stringify(dummies));

  return newDummy;
}

export async function updateDummy(id: number, dummy: DummyFormData) {
  await sleep(150);

  const dummies = getDummiesFromLocalStorage();

  const index = dummies.findIndex((d) => d.id === id);
  if (index === -1) {
    throw new Error('Dummy not found');
  }

  const updatedDummy = {
    ...dummies[index],
    ...dummy,
    id,
  };

  dummies[index] = updatedDummy;
  localStorage.setItem('dummies', JSON.stringify(dummies));

  return updatedDummy;
}

export async function deleteDummy(id: number) {
  await sleep(150);

  const dummies = getDummiesFromLocalStorage();

  const index = dummies.findIndex((d) => d.id === id);
  if (index === -1) {
    throw new Error('Dummy not found');
  }

  dummies.splice(index, 1);
  localStorage.setItem('dummies', JSON.stringify(dummies));
}
