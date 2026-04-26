import type { LoginData, User } from '@/modules/auth/types';

import { createContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  loginMutationOptions,
  logoutMutationOptions,
  sessionQueryOptions,
} from '@/modules/auth/api/query-options';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(sessionQueryOptions);

  const loginMutation = useMutation({
    ...loginMutationOptions,
    onSuccess: (user) => {
      queryClient.setQueryData(sessionQueryOptions.queryKey, user); // instant, no refetch
    },
  });

  const logoutMutation = useMutation({
    ...logoutMutationOptions,
    onSuccess: () => {
      queryClient.setQueryData(sessionQueryOptions.queryKey, null);
    },
  });

  const checkPermissions = (permissions: string[] | string) =>
    Boolean(
      typeof permissions === 'string'
        ? user?.permissions.includes(permissions)
        : user?.permissions.some((p) => permissions.includes(p)),
    );

  const checkRoles = (roles: string[] | string) =>
    Boolean(
      typeof roles === 'string'
        ? user?.roles.includes(roles)
        : user?.roles.some((p) => roles.includes(p)),
    );

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        p: checkPermissions,
        r: checkRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<User>;
  logout: () => Promise<void>;
  p: (permissions: string[] | string) => boolean;
  r: (roles: string[] | string) => boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
