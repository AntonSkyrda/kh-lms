import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";
import ApiGroups from "../../../lib/services/apiGroups";
import type { UserPlain } from "../../../schemas/userSchemas";

interface MutateParams {
  students: UserPlain[];
  studentToRemoveId: number;
}

export function useRemoveStudentFromGroup() {
  const {
    mutate: removeStudentFromGroup,
    isPending,
    error: removeStudentFromGroupError,
  } = useRecourceRelatedMutation({
    paramName: "groupId",
    mutationFn: (groupId, params: MutateParams) =>
      ApiGroups.removeStudent(
        groupId,
        params.students,
        params.studentToRemoveId,
      ),
    successMessage: (group) =>
      `З групи ${group.name} успішно видалено студента`,
  });

  return { removeStudentFromGroup, isPending, removeStudentFromGroupError };
}
