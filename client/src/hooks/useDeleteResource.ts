import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IuseDeleteResource<T> {
  mutationFn: (id: number) => Promise<T>;
  successMessage: string;
  paramName: string;
  navigateTo?: string;
  onDelete?: () => void;
}

export function useDeleteResource<T>({
  mutationFn,
  successMessage,
  paramName,
  navigateTo,
  onDelete,
}: IuseDeleteResource<T>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const navigateToUrl = navigateTo || paramName;

  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: number) => {
      if (!id)
        throw new Error(
          `There is an error with this ${paramName.replace("Id", "")}`,
        );

      return mutationFn(id);
    },
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === paramName,
      });
      onDelete ? onDelete?.() : navigate(`/${navigateToUrl}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, error };
}
