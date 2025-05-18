import type { CourseDetailed, CoursePlain } from "../../schemas/coursesSchema";
import type { User } from "../../schemas/userSchemas";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useDeleteCourse } from "./useDeleteCourse";

interface DeleteCourseProps {
  course: CourseDetailed | CoursePlain;
  user: User;
}

function DeleteCourse({ course, user }: DeleteCourseProps) {
  const { deleteCourse, isPending } = useDeleteCourse();

  if (user?.role !== "admin") return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити курс"
      title={`Ви точно хочете видалити курс ${course.name}`}
      onDelete={() => deleteCourse(course.id)}
      isLoading={isPending}
    />
  );
}

export default DeleteCourse;
