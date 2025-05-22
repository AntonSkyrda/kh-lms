import { ItemsContainer } from "../../ui/ItemsContainer";
import { type GroupDetailed } from "../../schemas/groupsSchema";
import { useAddStudentToGroup } from "./useAddStudentToGroup";
import { useCallback, useState } from "react";
// import { useRemoveStudentFromGroup } from "./useRemoveStudentFromGroup";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../contexts/user/useUser";
import StudentsSearch from "../users/StudentsSearch";
import { useStudents } from "../users/useStudents";

interface GroupStudentsProps {
  group: GroupDetailed;
}

function GroupStudents({ group }: GroupStudentsProps) {
  const { user } = useUser();
  const isActionAvailable = user?.role === "admin";
  const queryClient = useQueryClient();

  const { addStudentToGroup, isPending } = useAddStudentToGroup();
  // const { removeStudentFromGroup } = useRemoveStudentFromGroup();

  const [searchStr, setSearchStr] = useState("");

  const { students, isLoading } = useStudents(searchStr);

  const isWorking = isLoading || isPending;

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["students"] });
      setSearchStr("");
    },
    [queryClient],
  );

  function handleAddStudent(studentId: number) {
    if (!group?.id) return toast.error("Неможливо отримати дані про курс");

    if (typeof studentId !== "number") return;

    addStudentToGroup({ data: studentId });
    clear();
  }

  return (
    <ItemsContainer>
      <ItemsContainer.Header>Студенти</ItemsContainer.Header>
      <ItemsContainer.Content>
        <ItemsContainer.ItemsList>
          {group.students.map((student) => (
            <ItemsContainer.Item
              key={student.id}
              isActionAvailable={isActionAvailable}
              // onAction={() => removeStudentFromGroup({ data: student.id })}
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
          description="оберіть студента, якого хочете додати"
          handleClear={clear}
        >
          <StudentsSearch
            searchStr={searchStr}
            handleSearch={setSearchStr}
            isLoading={isWorking}
            handleSubmit={handleAddStudent}
            students={students}
          />
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </ItemsContainer>
  );
}

export default GroupStudents;
