import { useResource } from "../../hooks/useResource";
import ApiCourses from "../../lib/services/apiCourses";

export function useCourse(courseId?: number) {
  const {
    isLoading,
    resource: course,
    error: courseError,
  } = useResource({
    resourceName: "course",
    fetchFn: ApiCourses.getCourse,
    paramName: "courseId",
    id: courseId,
  });

  return { isLoading, course, courseError };
}
