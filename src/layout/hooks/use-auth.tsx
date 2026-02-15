import { useContext } from 'react';

import { AuthContext } from '@/layout/contexts/auth-provider';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
