import type {
  DummiesSearchParams,
  DummyFormData,
} from '@/modules/dummies/types';

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createDummy,
  deleteDummy,
  getDummiesList,
  getDummyById,
  updateDummy,
} from '@/modules/dummies/api/query-fns';

export const dummiesIndexQueryOptions = (params: DummiesSearchParams) =>
  queryOptions({
    queryKey: ['dummies', params],
    queryFn: () => getDummiesList(params),
  });

export const dummyQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['dummyById', itemId],
    queryFn: () => getDummyById(itemId),
  });

export const createDummyMutationOptions = mutationOptions({
  mutationFn: createDummy,
});

export const updateDummyMutationOptions = (id: number) =>
  mutationOptions({
    mutationFn: (data: DummyFormData) => updateDummy(id, data),
  });

export const deleteDummyMutationOptions = (id: number) =>
  mutationOptions({
    mutationFn: () => deleteDummy(id),
  });
