import type { LoginData, User } from '@/modules/auth/types';
import type { ReactNode } from 'react';

import { createContext, useCallback, useEffect, useState } from 'react';

import { checkAuth, login, logout } from '@/modules/auth/api';
import { getUserToken, removeUserToken } from '@/modules/auth/lib/token';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const handleLogin = useCallback(async (loginData: LoginData) => {
    const user = await login(loginData);
    setUser(user);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    removeUserToken();
  }, []);

  const handleCheckAuth = useCallback(async () => {
    const token = getUserToken();

    if (token) {
      try {
        const user = await checkAuth(token);
        setUser(user);
      } catch (error) {
        console.log(error);
        removeUserToken();
      }
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleCheckAuth().then();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextValue = {
  isAuthenticated: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
};

export type AuthProviderProps = {
  children: ReactNode;
};
