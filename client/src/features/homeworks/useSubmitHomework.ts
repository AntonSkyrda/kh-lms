import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitFormForStudentValues } from "../../schemas/homeworksSchema";
import ApiHomeworks from "../../lib/services/apiHomeworks";
import toast from "react-hot-toast";

interface SubmitData {
  id: number;
  data: SubmitFormForStudentValues;
}

export function useSubmitHomework() {
  const queryClient = useQueryClient();

  const {
    mutate: submitHomework,
    isPending,
    error: submitHomeworkError,
  } = useMutation({
    mutationFn: ({ id, data }: SubmitData) =>
      ApiHomeworks.submitHomework(id, data.answer),
    onSuccess: (status) => {
      toast.success(`Домашнє завдання ${status.homework} успішно здано!`);
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "homeworkStatus",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { submitHomework, isPending, submitHomeworkError };
}
