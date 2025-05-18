import ApiCourses from "../../../lib/services/apiCourses";
import type {
  CourseDetailed,
  CourseProgram,
  CourseProgramFormValues,
} from "../../../schemas/coursesSchema";
import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";

interface MutateParams {
  programs: CourseProgram[];
  newProgram: CourseProgramFormValues;
}

export function useAddProgram() {
  const {
    mutate: addProgram,
    isPending,
    error,
  } = useRecourceRelatedMutation<MutateParams, CourseDetailed>({
    paramName: "courseId",
    mutationFn: (courseId: number, params: MutateParams) =>
      ApiCourses.addProgram(courseId, params.programs, params.newProgram),
    successMessage: (course) => `До курсу ${course.name} успішно додано Тему`,
  });

  return { addProgram, isPending, error };
}
