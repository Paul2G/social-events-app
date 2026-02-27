import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/core/components/ui/sidebar';
import projectConfig from '@/project.config';

export function SidebarTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <img
                src={projectConfig.brand.logoSrc}
                alt={projectConfig.name}
                className="h-8 w-8"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">{projectConfig.name}</span>
              <span className="">{projectConfig.version}</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
