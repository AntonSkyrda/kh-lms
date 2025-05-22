import { useResources } from "../../hooks/useResources";
import ApiCourses from "../../lib/services/apiCourses";
import type { CoursePlain } from "../../schemas/coursesSchema";

export function useCourses(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalCourses,
    results: courses,
    error: coursesError,
  } = useResources<CoursePlain>({
    searchStr,
    resourceName: "courses",
    fetchFn: ApiCourses.getCourses,
  });

  return { isLoading, totalCourses, courses, coursesError };
}
