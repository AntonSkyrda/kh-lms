import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";
import ApiCourses from "../../../lib/services/apiCourses";

interface MutateParams {
  groups: number[];
  newGroupId: number;
}

export function useAddGroupToCourse() {
  const {
    mutate: addGroupToCourse,
    isPending,
    error: addGroupToCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, params: MutateParams) =>
      ApiCourses.addGroup(courseId, params.groups, params.newGroupId),
    successMessage: (course) => `До курсу ${course.name} успішно додано групу`,
  });

  return { addGroupToCourse, isPending, addGroupToCourseError };
}
