import type { LoginData } from '@/modules/auth/types';

import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { z } from 'zod';

import { LoginForm } from '@/modules/auth/components/forms/login-form';
import { useAuth } from '@/modules/auth/hooks/use-auth';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const fallback = '/dashboard' as const;

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context, search }) => {
    const user = await context.auth.verifySession();

    if (Boolean(user)) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const auth = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const isLoading = useRouterState({
    select: (s) => s.isLoading,
  });

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: async () => {
      // refresh router loaders that depend on auth
      await router.invalidate();

      await navigate({
        to: search.redirect || fallback,
      });
    },

    onError: (error) => {
      console.error('Error logging in:', error);
    },
  });

  function onFormSubmit(loginData: LoginData) {
    loginMutation.mutate(loginData);
  }

  const isLoggingIn = isLoading || loginMutation.isPending;

  return (
    <main className="bg-muted h-screen w-screen flex justify-center items-center">
      <LoginForm
        className="w-full max-w-[24rem] animate-in fade-in duration-1000"
        onSubmit={onFormSubmit}
        isLoading={isLoggingIn}
      />
    </main>
  );
}
