import ApiCourses from "../../../lib/services/apiCourses";
import type {
  CourseDetailed,
  CourseProgram,
} from "../../../schemas/coursesSchema";
import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";

interface MutateParams {
  programs: CourseProgram[];
  updatedProgram: CourseProgram;
}

export function useEditProgram() {
  const {
    mutate: editProgram,
    isPending,
    error,
  } = useRecourceRelatedMutation<MutateParams, CourseDetailed>({
    paramName: "courseId",
    mutationFn: (courseId: number, params: MutateParams) =>
      ApiCourses.editProgram(courseId, params.programs, params.updatedProgram),
    successMessage: (course) => `Тему курсу ${course.name} успішно оновлено`,
  });

  return { editProgram, isPending, error };
}
