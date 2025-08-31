import CurseForm from "./CurseForm";
import AddRecourceButton from "../../ui/AddRecourceButton";
import { useUser } from "../../contexts/user/useUser";

function AddCourse() {
  const { user } = useUser();

  if (!user || user?.role !== "admin") return null;

  return (
    <AddRecourceButton
      triggerTitle="Додати курс"
      title="Додавання курсу"
      description="Тут ви можете додати новий курс."
    >
      <CurseForm />
    </AddRecourceButton>
  );
}

export default AddCourse;
