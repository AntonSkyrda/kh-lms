import { useResources } from "../../hooks/useResources";
import ApiHomeworks from "../../lib/services/apiHomeworks";
import type { HomeworkPlain } from "../../schemas/homeworksSchema";

export function useHomeworks(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalHomeworks,
    results: homeworks,
    error: homeworksError,
  } = useResources<HomeworkPlain>({
    searchStr,
    resourceName: "courses",
    fetchFn: ApiHomeworks.getHomeworks,
  });

  return { isLoading, totalHomeworks, homeworks, homeworksError };
}
