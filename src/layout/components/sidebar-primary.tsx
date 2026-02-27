import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/core/components/ui/sidebar';
import { SidebarNavMain } from '@/layout/components/sidebar-nav-main';
import { SidebarNavSecondary } from '@/layout/components/sidebar-nav-secondary';
import { SidebarTitle } from '@/layout/components/sidebar-title';
import { SidebarUser } from '@/layout/components/sidebar-user';
import { useNavigationItems } from '@/layout/hooks/use-navigation-items';

export function SidebarPrimary({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navItems = useNavigationItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTitle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={navItems.main} />
        <SidebarNavSecondary items={navItems.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
