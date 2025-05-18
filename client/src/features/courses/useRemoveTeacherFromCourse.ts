import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import ApiCourses from "../../lib/services/apiCourses";

export function useRemoveTeacherFromCourse() {
  const {
    mutate: removeTeacherFromCourse,
    isPending,
    error: removeTeacherFromCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: ApiCourses.removeTeacher,
    successMessage: (course) =>
      `З групи ${course.name} успішно видалено викладача`,
  });

  return { removeTeacherFromCourse, isPending, removeTeacherFromCourseError };
}
