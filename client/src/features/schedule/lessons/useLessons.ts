import { useQuery } from "@tanstack/react-query";
import ApiLessons from "../../../lib/services/apiLessons";
import type { Lesson } from "../../../schemas/lessonsSchema";

export function useLessons(
  dateFrom: string,
  dateTo: string,
  courseId?: number,
  groupId?: number,
) {
  const {
    isLoading,
    data: lessons,
    error: lessonsError,
  } = useQuery<Lesson[]>({
    queryKey: ["lessons", dateFrom, dateTo, courseId, groupId],
    queryFn: () => ApiLessons.getLessons(dateFrom, dateTo, courseId, groupId),
  });

  return { isLoading, lessons, lessonsError };
}
