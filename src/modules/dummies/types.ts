import { z } from 'zod';

import {
  dummiesSearchSchema,
  dummyFormSchema,
  dummySchema,
} from '@/modules/dummies/schemas';

export type Dummy = z.infer<typeof dummySchema>;
export type DummyFormData = z.infer<typeof dummyFormSchema>;

export type DummiesSearchParams = z.infer<typeof dummiesSearchSchema>;
