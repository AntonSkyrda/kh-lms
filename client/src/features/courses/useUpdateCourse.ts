import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import ApiCourses from "../../lib/services/apiCourses";
import type {
  CourseDetailed,
  CourseUpdateFormValues,
} from "../../schemas/coursesSchema";

export function useUpdateCourse() {
  const {
    mutate: updateCourse,
    isPending,
    error,
  } = useRecourceRelatedMutation<CourseUpdateFormValues, CourseDetailed>({
    paramName: "courseId",
    mutationFn: (courseId: number, params: CourseUpdateFormValues) =>
      ApiCourses.update(courseId, params),
    successMessage: (course) => `Курсу ${course.name} успішно оновлено`,
  });

  return { updateCourse, isPending, error };
}
