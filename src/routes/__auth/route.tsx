import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

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
    <div className="p-2 h-full">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="py-2 flex gap-2">
        <li>
          <Link
            to="/dashboard"
            className='hover:underline data-[status="active"]:font-semibold'
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
