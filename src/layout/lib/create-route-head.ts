import type { AnyRouteMatch } from '@tanstack/react-router';

import { getValue } from '@/core/lib/utils';
import projectConfig from '@/project.config';

export function createRouteHead(props: createRouteHeadFunctionProps): HeadFn {
  const suffix = projectConfig.name;

  switch (props.type) {
    case 'root':
      return () => ({
        meta: [{ title: suffix }],
      });

    case 'index':
      return ({ match }) => ({
        meta: [
          {
            title: `${match.context.i18n.t(props.titleI18nKey)} | ${suffix}`,
          },
        ],
      });

    case 'item':
      return ({ match }) => {
        const value = getValue(match.loaderData, props.titleAccessorKey);
        const title = typeof value === 'string' ? value : suffix;

        return {
          meta: [{ title: `${title} | ${suffix}` }],
        };
      };
  }
}

type HeadResult = { meta: Array<{ title: string }> };
type HeadFn = (args: { match: AnyRouteMatch }) => HeadResult;

export type createRouteHeadFunctionProps =
  | { type: 'root' }
  | { type: 'index'; titleI18nKey: string }
  | { type: 'item'; titleAccessorKey: string };
