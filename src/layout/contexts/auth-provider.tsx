import type { ReactNode } from 'react';

import { createContext, useCallback, useEffect, useState } from 'react';

import { sleep } from '@/core/lib/utils';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null);

const key = 'tanstack.auth.user';

function getStoredUser(): string {
  return localStorage.getItem(key) ?? '';
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);
  }, []);

  const login = useCallback(async (username: string) => {
    await sleep(500);

    setStoredUser(username);
    setUser(username);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
};

export type AuthProviderProps = {
  children: ReactNode;
};
