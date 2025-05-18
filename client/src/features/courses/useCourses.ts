import { useResources } from "../../hooks/useResources";
import ApiCourses from "../../lib/services/apiCourses";
import type { CoursePlain } from "../../schemas/coursesSchema";

export function useCourses() {
  const {
    isLoading,
    totalItems: totalCourses,
    results: courses,
    error: coursesError,
  } = useResources<CoursePlain>({
    resourceName: "courses",
    fetchFn: ApiCourses.getCourses,
  });

  return { isLoading, totalCourses, courses, coursesError };
}
