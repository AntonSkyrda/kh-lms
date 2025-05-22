import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

import { ItemsContainer } from "../../../ui/ItemsContainer";
import { useAddGroupToCourse } from "./useAddGroupToCourse";
import { useRemoveGroupFromCourse } from "./useRemoveGroupFromCourse";
import GroupsSearch from "../../groups/GroupsSearch";
import { useUser } from "../../../contexts/user/useUser";
import { useItemsContainer } from "../../../contexts/ItemsContainer/ItemsContainerProvider";
import { useGroups } from "../../groups/useGroups";

interface CourseGroupsProps {
  groupsFromCourse: number[];
}

function CourseGroups({ groupsFromCourse }: CourseGroupsProps) {
  const { user } = useUser();
  const isActionAvailable = user?.role === "admin";

  const { setIsDialogOpen } = useItemsContainer();
  const queryClient = useQueryClient();

  const [searchStr, setSearchStr] = useState("");
  const { groups, isLoading } = useGroups(searchStr);

  const { addGroupToCourse, isPending: isAddingGroup } = useAddGroupToCourse();
  const { removeGroupFromCourse, isPending: isRemovingGroupd } =
    useRemoveGroupFromCourse();

  const isWorking = isLoading || isAddingGroup || isRemovingGroupd;

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["groups"] });
      setSearchStr("");
      setIsDialogOpen(false);
    },
    [queryClient, setIsDialogOpen],
  );

  function handleAddGroup(groupId: number) {
    if (!groupId) return toast.error("Неможливо отримати дані про курс");

    if (typeof groupId !== "number") return;

    addGroupToCourse({
      data: { groups: groupsFromCourse, newGroupId: groupId },
    });
    clear();
  }

  const groupsToShow = groups.filter(
    (group) => !groupsFromCourse.includes(group.id),
  );

  return (
    <>
      <ItemsContainer.Header>
        <ItemsContainer.Title>Групи</ItemsContainer.Title>
      </ItemsContainer.Header>

      <ItemsContainer.Content>
        <ItemsContainer.ItemsList emptyMessage="Жодна група не додана до курсу">
          {groupsFromCourse.map((group) => (
            <ItemsContainer.Item
              key={group}
              isActionAvailable={isActionAvailable}
              onAction={() =>
                removeGroupFromCourse({
                  data: { groups: groupsFromCourse, groupToRemoveId: group },
                })
              }
            >
              <NavLink to={`/groups?groupId=${group}`}>{group}</NavLink>
            </ItemsContainer.Item>
          ))}
        </ItemsContainer.ItemsList>

        <ItemsContainer.Footer>
          {isActionAvailable && (
            <ItemsContainer.AddButton>Додати групу</ItemsContainer.AddButton>
          )}
        </ItemsContainer.Footer>

        <ItemsContainer.ItemsDialog
          title="Додавання Групи"
          description="Оберіть групу, яку хочете додати"
          handleClear={clear}
        >
          <GroupsSearch
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            handleSelect={handleAddGroup}
            isLoading={isWorking}
            groups={groupsToShow}
            isModal={true}
          />
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </>
  );
}

export default CourseGroups;
