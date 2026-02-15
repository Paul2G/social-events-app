import type { AuthContextValue } from '@/modules/auth/contexts/auth-provider';
import type { QueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useTranslation } from 'react-i18next';

import {
  getUserLocalePreference,
  setLocaleInDocument,
} from '@/config/lib/locales';

export function RootLayout() {
  const { i18n } = useTranslation();

  const loadedLocale = getUserLocalePreference();

  useEffect(() => {
    i18n.changeLanguage(loadedLocale).then();
    setLocaleInDocument(loadedLocale);
  }, []);

  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContextValue;
}>()({
  component: RootLayout,
});
