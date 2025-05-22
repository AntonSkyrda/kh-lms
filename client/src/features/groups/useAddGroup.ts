import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ApiGroups from "../../lib/services/apiGroups";
import type { GroupFormValues } from "../../schemas/groupsSchema";

export function useAddGroup() {
  const queryClient = useQueryClient();

  const {
    mutate: addGroup,
    isPending,
    error: addGroupError,
  } = useMutation({
    mutationFn: (data: GroupFormValues) => ApiGroups.add(data),
    onSuccess: (group) => {
      toast.success(`Групу ${group.name} успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addGroup, isPending, addGroupError };
}
