import { createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/modules/auth/hooks/use-auth';

export const Route = createFileRoute('/__auth/dashboard')({
  component: DashboardPage,
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
