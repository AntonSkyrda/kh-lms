import { useResource } from "../../hooks/useResource";
import ApiGroups from "../../lib/services/apiGroups";

export function useGroup() {
  const {
    isLoading,
    resource: group,
    error: groupError,
  } = useResource({
    resourceName: "group",
    fetchFn: ApiGroups.getGroup,
    paramName: "groupId",
  });

  return { isLoading, group, groupError };
}
