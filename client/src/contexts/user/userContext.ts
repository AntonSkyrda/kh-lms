import { createContext } from "react";
import type { User } from "../../schemas/usersSchema";

interface UserContextType {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const UserContext = createContext<UserContextType | null>(null);
