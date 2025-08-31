import { Moon, Sun, Monitor } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/Sidebar";
import { useTheme } from "../hooks/useTheme";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Світла", icon: Sun },
    { value: "dark", label: "Темна", icon: Moon },
    { value: "system", label: "Системна", icon: Monitor },
  ];

  const currentTheme = themeOptions.find((option) => option.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <div className="flex flex-row items-center justify-center gap-5">
                <CurrentIcon />
                <span>{currentTheme?.label || "Тема"}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-32">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value as typeof theme)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {option.label}
                  {theme === option.value && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
