import { z } from 'zod';

import { ItemStatus } from '@/core/constants/misc';
import { paginationSearchSchema } from '@/core/types/search-params';

export const dummySchema = z.object({
  // Server-generated fields
  id: z.number(),
  created_at: z.string(),
  // Form field
  key: z.string().min(1),
  name: z.string().min(1),
  count: z.number().min(0),
  description: z.string(),
  status: z.string(),
  email: z.email(),
  website: z.url(),
  image: z.url(),
  special: z.boolean(),
  price: z.number(),
});
export const dummyFormSchema = dummySchema.omit({
  id: true,
  created_at: true,
});

export const dummiesFiltersSchema = z.object({
  search: z.string().optional().catch(''),
  status: z.literal(Object.values(ItemStatus)).optional().catch(undefined),
});
export const dummiesSearchSchema = paginationSearchSchema.extend(
  dummiesFiltersSchema.shape,
);
