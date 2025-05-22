import { createContext } from "react";
import type { User } from "../../schemas/userSchemas";

interface UserContextType {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const UserContext = createContext<UserContextType | null>(null);
