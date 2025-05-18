import { useCourse } from "./useCourse";
import { useRemoveTeacherFromCourse } from "./useRemoveTeacherFromCourse";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { Minus } from "lucide-react";
import { useCurrentUser } from "../users/useCurrentUser";

function RemoveTeacherFromCourse() {
  const { user } = useCurrentUser();
  const { course } = useCourse();
  const { removeTeacherFromCourse, isPending } = useRemoveTeacherFromCourse();

  const shouldShowRemoveButton =
    user?.role === "admin" && Boolean(course?.teacher?.id);

  if (!user || !course) return null;
  if (!shouldShowRemoveButton) return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити викладача"
      title={`Ви точно хочете вилалити викладача ${course.teacher?.first_name} ${course.teacher?.last_name} з курсу ${course.name}?`}
      onDelete={() => removeTeacherFromCourse({})}
      isLoading={isPending}
      Icon={<Minus />}
    />
  );
}

export default RemoveTeacherFromCourse;
