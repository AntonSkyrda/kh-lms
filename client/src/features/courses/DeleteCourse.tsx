import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useCurrentUser } from "../users/useCurrentUser";
import { useDeleteCourse } from "./useDeleteCourse";

function DeleteGroup({ course }: { course: { name: string; id: number } }) {
  const { deleteCourse, isPending } = useDeleteCourse();
  const { user } = useCurrentUser();

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

export default DeleteGroup;
