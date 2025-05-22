import { useResources } from "../../hooks/useResources";
import ApiUsers from "../../lib/services/apiUsers";
import type { UserPlain } from "../../schemas/userSchemas";

export function useStudents(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalStudents,
    results: students,
    error: studentsError,
  } = useResources<UserPlain>({
    searchStr: searchStr,
    resourceName: "students",
    fetchFn: ApiUsers.getStudents,
  });

  return { isLoading, totalStudents, students, studentsError };
}
