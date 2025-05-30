import {
  Home,
  Folders,
  Users,
  ClipboardList,
  Sheet,
  Settings,
  SquareUser,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "./Sidebar";
import { useCurrentUser } from "../features/users/useCurrentUser";
import ShortUser from "../features/users/ShortUser";
import ToggleTheme from "./ToggleTheme";

const items = [
  {
    title: "Головна",
    url: "/home",
    icon: Home,
  },
  {
    title: "Розклад занять",
    url: "/schedule",
    icon: Sheet,
  },
  {
    title: "Завдання",
    url: "/homeworks",
    icon: ClipboardList,
  },
  {
    title: "Курси",
    url: "/courses",
    icon: Folders,
  },
  {
    title: "Групи",
    url: "/groups",
    icon: Users,
  },
];

const adminItems = [
  {
    title: "Користувачі",
    url: "/lms-admin-route/users",
    icon: SquareUser,
  },
  {
    title: "Налаштування",
    url: "/lms-admin-route/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { user } = useCurrentUser();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>LMS</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навігація</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        tooltip={item.title}
                        asChild
                        isActive={isActive}
                      >
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
              {user?.role === "admin" && (
                <>
                  <SidebarSeparator />
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <NavLink to={item.url}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            tooltip={item.title}
                            asChild
                            isActive={isActive}
                          >
                            <div>
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ToggleTheme />
        {user && <ShortUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
