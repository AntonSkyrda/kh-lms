import { useResources } from "../../hooks/useResources";
import ApiGroups from "../../lib/services/apiGroups";
import type { GroupPlain } from "../../schemas/groupsSchema";

export function useGroups(searchStr: string = "") {
  const {
    isLoading,
    totalItems: totalGroups,
    results: groups,
    error: groupsError,
  } = useResources<GroupPlain>({
    searchStr,
    resourceName: "groups",
    fetchFn: ApiGroups.getGroups,
  });

  return { isLoading, totalGroups, groups, groupsError };
}
