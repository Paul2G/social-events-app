import type { NavigationItem } from '@/layout/types';

import { Link } from '@tanstack/react-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/core/components/ui/sidebar';

export function SidebarNavSecondary({
  items,
  ...props
}: SidebarNavSecondaryProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  {item.icon && (
                    <>
                      <item.icon />
                      <span>{item.title}</span>
                    </>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export type SidebarNavSecondaryProps = React.ComponentProps<'div'> & {
  items: NavigationItem[];
};
