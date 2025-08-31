import { useDeleteResource } from "../../../hooks/useDeleteResource";
import ApiLessons from "../../../lib/services/apiLessons";

export function useDeleteLesson(onDelete: () => void) {
  const {
    mutate: deleteLesson,
    isPending,
    error: deleteLessonError,
  } = useDeleteResource({
    mutationFn: (lessonId: number) => ApiLessons.deleteLesson(lessonId),
    paramName: "lessons",
    successMessage: `Урок був успішно видалений`,
    navigateTo: "schedule",
    onDelete,
  });

  return { deleteLesson, isPending, deleteLessonError };
}
