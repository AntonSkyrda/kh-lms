import apiGroups from "../../lib/services/apiGroups";
import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import type {
  GroupDetailed,
  GroupUpdateFormValues,
} from "../../schemas/groupsSchema";

export function useUpdateGroup() {
  const {
    mutate: updateGroup,
    isPending,
    error,
  } = useRecourceRelatedMutation<GroupUpdateFormValues, GroupDetailed>({
    paramName: "groupId",
    mutationFn: (groupId: number, params: GroupUpdateFormValues) =>
      apiGroups.update(groupId, params),
    successMessage: (group) => `Групу ${group.name} успішно оновлено`,
  });

  return { updateGroup, isPending, error };
}
