import { useDeleteResource } from "../../hooks/useDeleteResource";
import ApiGroups from "../../lib/services/apiGroups";

export function useDeleteGroup() {
  const {
    mutate: deleteGroup,
    isPending,
    error: deleteGroupError,
  } = useDeleteResource({
    mutationFn: (groupId: number) => ApiGroups.deleteGroup(groupId),
    paramName: "groups",
    successMessage: `Група була успішно видалена`,
  });

  return { deleteGroup, isPending, deleteGroupError };
}
