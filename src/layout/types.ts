import type { Icon } from '@phosphor-icons/react';

export type NavigationItem = {
  title: string;
  url: string;
  icon?: Icon;
  isActive?: boolean;
  items?: NavigationItem[];
};
