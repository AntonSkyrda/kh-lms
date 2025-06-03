import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ApiUsers from "../../lib/services/apiUsers";
import type { UserAddFormValues } from "../../schemas/usersSchema";

const userTypes = {
  is_student: "Студента",
  is_teacher: "Викладача",
  is_superuser: "Адміністратора",
};

function whoIsUser(
  is_student: boolean,
  is_teacher: boolean,
  is_superuser?: boolean,
) {
  if (is_teacher) return userTypes["is_teacher"];
  if (is_student) return userTypes["is_student"];
  if (is_superuser) return userTypes["is_superuser"];
}

export function useAddUser() {
  const queryClient = useQueryClient();
  const {
    mutate: addUser,
    isPending,
    error: addUserError,
  } = useMutation({
    mutationFn: (data: UserAddFormValues) => ApiUsers.add(data),
    onSuccess: (user) => {
      toast.success(
        `${whoIsUser(user.is_student, user.is_teacher)} ${user.first_name} успішно створено`,
      );
      queryClient.refetchQueries({ queryKey: ["students"] });
      queryClient.refetchQueries({ queryKey: ["teachers"] });
    },
    onError: () => {
      toast.error("Сталася помилка при створенні користувача.");
    },
  });

  return { addUser, isPending, addUserError };
}
