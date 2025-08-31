import { type ReactNode } from "react";
import { useCurrentUser } from "../../features/users/useCurrentUser";
import { UserContext } from "./userContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { user, isLoading, error } = useCurrentUser();

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}
