import { createFileRoute } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { useAuth } from '@/modules/auth/hooks/use-auth';

export const Route = createFileRoute('/app/dashboard')({
  component: DashboardPage,
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navItems.dashboard',
  }),
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {user?.username}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  );
}
