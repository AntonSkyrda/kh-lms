import { useResource } from "../../hooks/useResource";
import ApiCourses from "../../lib/services/apiCourses";

export function useCourse() {
  const {
    isLoading,
    resource: course,
    error: courseError,
  } = useResource({
    resourceName: "course",
    fetchFn: ApiCourses.getCourse,
    paramName: "courseId",
  });

  return { isLoading, course, courseError };
}
