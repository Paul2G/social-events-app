import {
  BookmarksIcon,
  ChartPieIcon,
  GearIcon,
  InfoIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export function useNavigationItems() {
  const { t } = useTranslation();

  // TODO: Check optimization here
  return {
    main: [
      {
        title: t('layout:navItems.dashboard'),
        url: '/app/dashboard',
        icon: ChartPieIcon,
      },
      {
        title: t('layout:navItems.dummies'),
        url: '/app/dummies',
        icon: BookmarksIcon,
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
