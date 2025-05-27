import { ChevronUp, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdownMenu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/Sidebar";
import { NavLink } from "react-router-dom";
import type { User } from "../../schemas/usersSchema";
import { useLogout } from "./useLogout";

interface ShortUserProps {
  user: User;
}

function ShortUser({ user }: ShortUserProps) {
  const { logout } = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <div className="flex flex-row items-center justify-center gap-5">
                <User2 />
                <span>{user?.first_name}</span>
              </div>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-32">
            <NavLink to="/account">
              <DropdownMenuItem className="cursor-pointer">
                Профіль
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => logout()}
            >
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default ShortUser;
