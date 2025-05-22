import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { ItemsContainer } from "../../../ui/ItemsContainer";
import { type GroupDetailed } from "../../../schemas/groupsSchema";
import { useAddStudentToGroup } from "./useAddStudentToGroup";
import { useRemoveStudentFromGroup } from "./useRemoveStudentFromGroup";
import { useUser } from "../../../contexts/user/useUser";
import StudentsSearch from "../../users/StudentsSearch";
import { useStudents } from "../../users/useStudents";
import { useItemsContainer } from "../../../contexts/ItemsContainer/ItemsContainerProvider";

interface GroupStudentsProps {
  group: GroupDetailed;
}

function GroupStudents({ group }: GroupStudentsProps) {
  const { user } = useUser();
  const isActionAvailable = user?.role === "admin";

  const { setIsDialogOpen } = useItemsContainer();
  const queryClient = useQueryClient();

  const { addStudentToGroup, isPending: isAddingStudent } =
    useAddStudentToGroup();
  const { removeStudentFromGroup, isPending: isRemovingStudent } =
    useRemoveStudentFromGroup();

  const [searchStr, setSearchStr] = useState("");
  const { students, isLoading } = useStudents(searchStr);

  const isWorking = isLoading || isAddingStudent || isRemovingStudent;

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["students"] });
      setSearchStr("");
      setIsDialogOpen(false);
    },
    [queryClient, setIsDialogOpen],
  );

  function handleAddStudent(studentId: number) {
    if (!group?.id) return toast.error("Неможливо отримати дані про курс");

    if (typeof studentId !== "number") return;

    addStudentToGroup({
      data: { students: group.students, newStudentId: studentId },
    });
    clear();
  }

  const studentsToShow = students.filter(
    (student) =>
      !group.students.map((student) => student.id).includes(student.id),
  );

  return (
    <>
      <ItemsContainer.Header>
        <ItemsContainer.Title>Студенти</ItemsContainer.Title>
      </ItemsContainer.Header>

      <ItemsContainer.Content>
        <ItemsContainer.ItemsList emptyMessage="Немає жодного студента">
          {group.students.map((student) => (
            <ItemsContainer.Item
              key={student.id}
              isActionAvailable={isActionAvailable}
              onAction={() =>
                removeStudentFromGroup({
                  data: {
                    students: group.students,
                    studentToRemoveId: student.id,
                  },
                })
              }
            >
              <NavLink to={`/students?studentId=${student.id}`}>
                {student.full_name}
              </NavLink>
            </ItemsContainer.Item>
          ))}
        </ItemsContainer.ItemsList>

        <ItemsContainer.Footer>
          {isActionAvailable && (
            <ItemsContainer.AddButton>
              Додати студентів до групи
            </ItemsContainer.AddButton>
          )}
        </ItemsContainer.Footer>

        <ItemsContainer.ItemsDialog
          title="Додавання студента"
          description="Оберіть студента, якого хочете додати"
          handleClear={clear}
        >
          <StudentsSearch
            searchStr={searchStr}
            handleSearch={setSearchStr}
            isLoading={isWorking}
            handleSubmit={handleAddStudent}
            students={studentsToShow}
            isModal={true}
          />
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </>
  );
}

export default GroupStudents;
