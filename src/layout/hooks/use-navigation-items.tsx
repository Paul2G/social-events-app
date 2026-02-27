import { ChartPieIcon, GearIcon, InfoIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export function useNavigationItems() {
  const { t } = useTranslation();

  // TODO: Check optimization here
  return {
    main: [
      {
        title: t('layout:navItems.dashboard'),
        url: '/dashboard',
        icon: ChartPieIcon,
      },
    ],
    secondary: [
      {
        title: t('layout:navItems.settings'),
        url: '/settings',
        icon: GearIcon,
      },
      {
        title: t('layout:navItems.getHelp'),
        url: '/about',
        icon: InfoIcon,
      },
    ],
  };
}
