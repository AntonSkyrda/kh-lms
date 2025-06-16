import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHomeworks from "../../../lib/services/apiHomeworks";
import toast from "react-hot-toast";

interface SubmitData {
  submissionId: number;
  grade: number;
  feedback: string;
}

export function useGiveGrade() {
  const queryClient = useQueryClient();

  const {
    mutate: giveGrade,
    isPending,
    error: giveGradeError,
  } = useMutation({
    mutationFn: ({ submissionId, grade, feedback }: SubmitData) =>
      ApiHomeworks.giveGrade(submissionId, grade, feedback),
    onSuccess: (submission) => {
      toast.success(`Домашнє завдання ${submission.homework} успішно оцінено!`);
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "homeworkStatus",
      });
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "homeworkSubmissions",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { giveGrade, isPending, giveGradeError };
}
