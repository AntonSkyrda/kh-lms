import { useDeleteResource } from "../../hooks/useDeleteResource";
import ApiCourses from "../../lib/services/apiCourses";

export function useDeleteCourse() {
  const {
    mutate: deleteCourse,
    isPending,
    error: deleteCourseError,
  } = useDeleteResource({
    mutationFn: (courseId: number) => ApiCourses.deleteCourse(courseId),
    paramName: "courses",
    successMessage: `Курс була успішно видалена`,
  });

  return { deleteCourse, isPending, deleteCourseError };
}
