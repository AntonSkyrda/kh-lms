import { useQuery } from "@tanstack/react-query";
import ApiLessons from "../../../lib/services/apiLessons";
import type { Lesson } from "../../../schemas/lessonsSchema";

export function useLessons(
  dateFrom: string,
  dateTo: string,
  courseId?: number,
  groupId?: number,
) {
  const queryKey = ["lessons", dateFrom, dateTo, courseId, groupId];

  const {
    isLoading,
    data: lessons,
    error: lessonsError,
    refetch,
  } = useQuery<Lesson[]>({
    queryKey,
    queryFn: () => ApiLessons.getLessons(dateFrom, dateTo, courseId, groupId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return { isLoading, lessons, lessonsError, refetch };
}
