import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../contexts/user/useUser";
import { cn } from "../../../lib/utils/cn";
import { buttonVariants } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "../../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import StudentsSearch from "../../users/StudentsSearch";
import { useAddStudentToGroup } from "./useAddStudentToGroup";
import { useCallback, useState } from "react";
import { useStudents } from "../../users/useStudents";
import toast from "react-hot-toast";
import type { GroupDetailed } from "../../../schemas/groupsSchema";

interface AddStudentToGroupProps {
  group: GroupDetailed;
}

function AddStudentToGroup({ group }: AddStudentToGroupProps) {
  const { user } = useUser();
  const isActionAvailable = user?.role === "admin";

  const queryClient = useQueryClient();

  const { addStudentToGroup, isPending: isAddingStudent } =
    useAddStudentToGroup();

  const [searchStr, setSearchStr] = useState("");
  const { students, isLoading } = useStudents(searchStr);

  const isWorking = isLoading || isAddingStudent;

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

    addStudentToGroup({
      data: { students: group.students, newStudentId: studentId },
    });
    clear();
  }

  const studentsToShow = students.filter(
    (student) =>
      !group.students.map((student) => student.id).includes(student.id),
  );

  if (!isActionAvailable) return null;
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "default" }), "ml-auto")}
      >
        Додати студента
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати студента до групи</DialogTitle>
        </DialogHeader>
        <DialogDescription>Додайте студента для групи...</DialogDescription>
        <Card>
          <CardHeader>Пошук студентів</CardHeader>
          <CardContent>
            <div>
              <StudentsSearch
                searchStr={searchStr}
                handleSearch={setSearchStr}
                isLoading={isWorking}
                students={studentsToShow}
                handleSubmit={handleAddStudent}
                isModal={true}
              />
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentToGroup;
