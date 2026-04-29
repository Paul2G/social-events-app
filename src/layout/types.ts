import type { Icon } from '@phosphor-icons/react';

export type NavigationItem = {
  title: string;
  url: string;
  icon?: Icon;
  permissions?: string | string[];
  items?: Omit<NavigationItem, 'items'>[];
  defaultOpen?: boolean;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};
