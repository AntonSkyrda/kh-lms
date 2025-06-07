import { useQuery } from "@tanstack/react-query";
import ApiHomeworks from "../../lib/services/apiHomeworks";

export function useHomeworkStatus(homeworkId: number) {
  const {
    isLoading,
    data: homeworkStatus,
    error,
  } = useQuery({
    queryKey: ["homeworkStatus", homeworkId],
    queryFn: () => ApiHomeworks.getSubmitStatusByStudent(homeworkId),
    retry: false,
  });

  return { isLoading, homeworkStatus, error };
}
