import { useQuery } from "@tanstack/react-query";
import ApiUser from "../../lib/services/apiUsers";

export function useCurrentUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => ApiUser.getCurrentUser(),
    retry: false
  });

  return { isLoading, user, error };
}
