import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { NavigationProgress } from '@/core/components/navigation-progress';
import { SidebarInset, SidebarProvider } from '@/core/components/ui/sidebar';
import { PageHeader } from '@/layout/components/page-header';
import { SidebarPrimary } from '@/layout/components/sidebar-primary';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.auth.verifySession();

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AppLayout,
  notFoundComponent: () => <p>No encontrado</p>,
  errorComponent: () => <p>Ocurrió un error</p>,
});

function AppLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <NavigationProgress />
      <SidebarPrimary />
      <SidebarInset>
        <PageHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
