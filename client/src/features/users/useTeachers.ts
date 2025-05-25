import { useResources } from "../../hooks/useResources";
import ApiUsers from "../../lib/services/apiUsers";
import type { UserPlain } from "../../schemas/usersSchema";

export function useTeachers(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalTeachers,
    results: teachers,
    error: teachersError,
  } = useResources<UserPlain>({
    searchStr: searchStr,
    resourceName: "teachers",
    fetchFn: ApiUsers.getTeachers,
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
