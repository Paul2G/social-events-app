import type { loginSchema } from '@/modules/auth/schemas';

import { z } from 'zod';

export type LoginData = z.infer<typeof loginSchema>;

export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
};
