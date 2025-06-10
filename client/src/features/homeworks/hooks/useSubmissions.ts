import { useQuery } from "@tanstack/react-query";
import ApiHomeworks from "../../../lib/services/apiHomeworks";

export function useSubmissions(homeworkId: number) {
  const {
    isLoading,
    data: homeworkSubmissions,
    error,
  } = useQuery({
    queryKey: ["homeworkSubmissions", homeworkId],
    queryFn: () => ApiHomeworks.getSubmission(homeworkId),
    retry: false,
  });

  return { isLoading, homeworkSubmissions, error };
}
