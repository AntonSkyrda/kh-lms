import ApiCourses from "../../../lib/services/apiCourses";
import type {
  CourseDetailed,
  CourseProgram,
} from "../../../schemas/coursesSchema";
import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";

interface MutateParams {
  programs: CourseProgram[];
  programToDeleteId: number;
}

export function useDeleteProgram() {
  const {
    mutate: deleteProgram,
    isPending,
    error,
  } = useRecourceRelatedMutation<MutateParams, CourseDetailed>({
    paramName: "courseId",
    mutationFn: (courseId: number, params: MutateParams) =>
      ApiCourses.deleteProgram(
        courseId,
        params.programs,
        params.programToDeleteId,
      ),
    successMessage: (course) => `Тему курсу ${course.name} успішно видалено`,
  });

  return { deleteProgram, isPending, error };
}
