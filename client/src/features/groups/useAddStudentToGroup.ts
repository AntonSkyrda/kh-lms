import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import ApiGroups from "../../lib/services/apiGroups";

interface MutateParams {
  students: number[];
  newStudentId: number;
}

export function useAddStudentToGroup() {
  const {
    mutate: addStudentToGroup,
    isPending,
    error: addStudentToGroupError,
  } = useRecourceRelatedMutation({
    paramName: "groupId",
    mutationFn: (groupId, params: MutateParams) =>
      ApiGroups.addStudent(groupId, params.students, params.newStudentId),
    successMessage: (group) => `До групи ${group.name} успішно додано студента`,
  });

  return { addStudentToGroup, isPending, addStudentToGroupError };
}
