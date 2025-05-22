import { useUser } from "../../contexts/user/useUser";
import type { GroupPlain } from "../../schemas/groupsSchema";
import UpdateRecourceButton from "../../ui/UpdateRecourceButton";
import GroupForm from "./GroupForm";

function UpdateGroup({ group }: { group: GroupPlain }) {
  const { user } = useUser();

  if (!user || user?.role !== "admin") return null;

  return (
    <UpdateRecourceButton
      triggerTitle="Редагувати групу"
      title="Оновлення інформації про групу"
      description="Тут ви можете оновити інформацію про групу"
    >
      <GroupForm groupToEdit={group} />
    </UpdateRecourceButton>
  );
}

export default UpdateGroup;
