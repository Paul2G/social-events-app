import type { NavigationGroup, NavigationItem } from '@/layout/types';

import {
  BookmarksIcon,
  ChartPieIcon,
  GearIcon,
  InfoIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export function useNavigationItems(): UseNavigationItemsReturn {
  const { t } = useTranslation();

  return {
    main: [
      {
        label: t('layout:navItems.tools'),
        items: [
          {
            title: t('layout:navItems.dashboard'),
            url: '/app/dashboard',
            icon: ChartPieIcon,
            permissions: 'dashboard.read',
          },
          {
            title: t('layout:navItems.dummies'),
            url: '/app/dummies',
            icon: BookmarksIcon,
            permissions: 'dummies.read',
          },
        ],
      },
    ],
    secondary: [
      {
        title: t('layout:navItems.settings'),
        url: '/app/settings',
        icon: GearIcon,
      },
      {
        title: t('layout:navItems.getHelp'),
        url: '/app/about',
        icon: InfoIcon,
      },
    ],
  };
}

export type UseNavigationItemsReturn = {
  main: NavigationGroup[];
  secondary: NavigationItem[];
};
