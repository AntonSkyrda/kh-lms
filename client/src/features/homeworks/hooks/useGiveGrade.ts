import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HomeworkSubmissions } from "../../../schemas/homeworksSchema";
import ApiHomeworks from "../../../lib/services/apiHomeworks";
import toast from "react-hot-toast";

interface SubmitData {
  homeworkId: number;
  submissionId: number;
  submissions: HomeworkSubmissions;
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
    mutationFn: ({
      homeworkId,
      submissionId,
      submissions,
      grade,
      feedback,
    }: SubmitData) =>
      ApiHomeworks.giveGrade(
        homeworkId,
        submissionId,
        grade,
        feedback,
        submissions,
      ),
    onSuccess: (submissions, vars) => {
      console.log(vars);
      toast.success(`Домашнє завдання успішно оцінено!`);
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
