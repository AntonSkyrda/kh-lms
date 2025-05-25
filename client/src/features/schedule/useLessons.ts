import { useResources } from "../../hooks/useResources";
import ApiLessons from "../../lib/services/apiLessons";
import type { Lesson } from "../../schemas/lessonsSchema";

export function useLessons(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalLessons,
    results: lessons,
    error: lessonsError,
  } = useResources<Lesson>({
    searchStr,
    resourceName: "courses",
    fetchFn: ApiLessons.getLessons,
  });

  return { isLoading, totalLessons, lessons, lessonsError };
}
