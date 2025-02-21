"use client";

import * as React from "react";

import { useSession, signOut } from "next-auth/react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

import SidebarFooterMenu from "./sidebar-footer-menu";
import SidebarNavigation from "./sidebar-navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={teams} /> */}
        <h1 className="text-lg font-semibold">CarLoka CMS</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
        {/* <SidebarProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu
          user={{
            email: session?.user.email ?? "",
            fullname: session?.user.name ?? "",
            image_url: session?.user.image ?? "",
          }}
          signOut={signOut}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
