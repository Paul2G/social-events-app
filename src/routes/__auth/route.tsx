import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { SidebarInset, SidebarProvider } from '@/core/components/ui/sidebar';
import { PageHeader } from '@/layout/components/page-header';
import { SidebarPrimary } from '@/layout/components/sidebar-primary';

export const Route = createFileRoute('/__auth')({
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
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <SidebarPrimary />
      <SidebarInset>
        <PageHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
