import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ApiUsers from "../../lib/services/apiUsers";
import type { UserUpdateFormValues } from "../../schemas/usersSchema";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending,
    error: updateUserError,
  } = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UserUpdateFormValues;
    }) => ApiUsers.updateCurrentUser(userId, data),
    onSuccess: () => {
      toast.success("Дані успішно оновленні!");
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Сталася помилка при оновленні даних.");
    },
  });

  return { updateUser, isPending, updateUserError };
}
