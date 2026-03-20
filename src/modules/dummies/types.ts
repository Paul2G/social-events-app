import { z } from 'zod';

export const dummySchema = z.object({
  id: z.number(),
  key: z.string(),
  name: z.string(),
  count: z.number(),
  description: z.string(),
  created_at: z.string().nullable(),
  status: z.string(),
  email: z.email(),
  website: z.url(),
  image: z.url(),
  special: z.boolean(),
  price: z.number(),
});

export type Dummy = z.infer<typeof dummySchema>;
