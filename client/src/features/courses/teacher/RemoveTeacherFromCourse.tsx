import { Minus } from "lucide-react";

import { useCourse } from "../useCourse";
import { useRemoveTeacherFromCourse } from "./useRemoveTeacherFromCourse";
import DeleteRecourceButton from "../../../ui/DeleteRecourceButton";
import { useCurrentUser } from "../../users/useCurrentUser";

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
      tiggerTitle=""
      title={`Ви точно хочете вилалити викладача ${course.teacher?.full_name} з курсу ${course.name}?`}
      onDelete={() => removeTeacherFromCourse({ id: course.id, data: {} })}
      isLoading={isPending}
      Icon={<Minus />}
    />
  );
}

export default RemoveTeacherFromCourse;
