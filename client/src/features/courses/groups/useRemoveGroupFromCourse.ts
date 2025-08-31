import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";
import ApiCourses from "../../../lib/services/apiCourses";

interface MutateParams {
  groups: number[];
  groupToRemoveId: number;
}

export function useRemoveGroupFromCourse() {
  const {
    mutate: removeGroupFromCourse,
    isPending,
    error: removeGroupFromCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, params: MutateParams) =>
      ApiCourses.removeGroup(courseId, params.groups, params.groupToRemoveId),
    successMessage: (course) => `З курсу ${course.name} успішно видалено групу`,
  });

  return { removeGroupFromCourse, isPending, removeGroupFromCourseError };
}
