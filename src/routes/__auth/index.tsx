import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/__auth/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({
      to: '/dashboard',
    });
  },
});

function RouteComponent() {
  return null;
}
