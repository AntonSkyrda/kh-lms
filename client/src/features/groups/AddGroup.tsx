import { useUser } from "../../contexts/user/useUser";
import AddRecourceButton from "../../ui/AddRecourceButton";
import GroupForm from "./GroupForm";

function AddGroup() {
  const { user } = useUser();

  if (!user || user?.role !== "admin") return null;

  return (
    <AddRecourceButton
      triggerTitle="Додати групу"
      title="Додавання групи"
      description="Тут ви можете створити групу"
    >
      <GroupForm />
    </AddRecourceButton>
  );
}

export default AddGroup;
