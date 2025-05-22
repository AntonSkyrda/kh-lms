import { useUser } from "../../contexts/user/useUser";
import type { GroupDetailed } from "../../schemas/groupsSchema";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useDeleteGroup } from "./useDeleteGroup";

function DeleteGroup({ group }: { group: GroupDetailed }) {
  const { deleteGroup, isPending } = useDeleteGroup();
  const { user } = useUser();

  if (!user || user?.role !== "admin") return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити групу"
      title={`Ви точно хочете видалити групу ${group.name}`}
      onDelete={() => deleteGroup(group.id)}
      isLoading={isPending}
    />
  );
}

export default DeleteGroup;
