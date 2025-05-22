// useResourceRelatedMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

interface IUseRecourceRelatedMutation<T, D> {
  mutationFn: (id: number, vars: T) => Promise<D>;
  successMessage: string | ((data: D) => string);
  paramName: string;
}

export function useRecourceRelatedMutation<T, D>({
  mutationFn,
  successMessage,
  paramName,
}: IUseRecourceRelatedMutation<T, D>) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const resourceId = params[paramName] || searchParams.get(paramName);

  const {
    mutate: mutateFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id?: number; data: T }) => {
      const identifier = id ?? (resourceId ? +resourceId : null);

      if (!identifier) {
        throw new Error(
          `No ${paramName.replace("Id", "")} ID provided. Pass it explicitly or ensure it's in the URL.`,
        );
      }

      return mutationFn(identifier, data);
    },
    onSuccess: (data) => {
      const message =
        typeof successMessage === "function"
          ? successMessage(data)
          : successMessage;

      toast.success(message);

      queryClient.invalidateQueries({
        queryKey: [paramName.replace("Id", ""), +(resourceId as string)],
      });

      queryClient.invalidateQueries({
        queryKey: [paramName.replace("Id", "s")],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { mutate: mutateFn, isPending, error };
}
