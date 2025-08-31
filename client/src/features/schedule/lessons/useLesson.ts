import { useQuery } from "@tanstack/react-query";
import ApiLessons from "../../../lib/services/apiLessons";

export function useLesson(lessonId: number) {
  const {
    isLoading,
    data: lesson,
    error,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => ApiLessons.getLesson(lessonId),
    enabled: !!lessonId,
    retry: false,
  });

  return { isLoading, lesson, error };
}
