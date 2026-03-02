import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getDummiesList } from '@/modules/dummies/api';

export const Route = createFileRoute('/app/dummies/')({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['dummies'],
    queryFn: () => getDummiesList(),
  });

  return (
    <div>
      <pre>{JSON.stringify(query.data?.items, null, 2)}</pre>
    </div>
  );
}
