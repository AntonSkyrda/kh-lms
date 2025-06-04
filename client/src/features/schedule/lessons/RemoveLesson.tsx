import { useUser } from "../../../contexts/user/useUser";
import type { Lesson } from "../../../schemas/lessonsSchema";
import DeleteRecourceButton from "../../../ui/DeleteRecourceButton";
import { useDeleteLesson } from "./useDeleteLesson";

interface RemoveLessonProps {
  lesson: Lesson;
  handleClose: () => void;
}

function RemoveLesson({ lesson, handleClose }: RemoveLessonProps) {
  const { user } = useUser();
  const { deleteLesson, isPending } = useDeleteLesson(handleClose);

  if (!user || user?.role !== "admin") return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити заняття"
      title={`Ви точно хочете видалити заняття з теми  ${lesson.program_topic}`}
      onDelete={() => deleteLesson(lesson.id)}
      isLoading={isPending}
    />
  );
}

export default RemoveLesson;
