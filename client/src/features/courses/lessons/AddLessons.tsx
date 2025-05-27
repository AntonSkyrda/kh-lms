import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { buttonVariants } from "../../../ui/button";
import CreateLessonsAutoForm from "../../schedule/CreateLessonAutoForm";
import type { CourseDetailed } from "../../../schemas/coursesSchema";
import { useUser } from "../../../contexts/user/useUser";

interface AddLessonsProps {
  course: CourseDetailed;
}

function AddLessons({ course }: AddLessonsProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const allowedUsers = ["admin", "teacher"];

  if (!user || !allowedUsers.includes(user?.role)) return null;

  function handleOpenChange(value: boolean) {
    if (!course.teacher?.id) return;

    setIsOpen(value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={buttonVariants({ variant: "outline" })}
        disabled={!course.teacher?.id}
      >
        <span>
          <Plus />
        </span>
        Створити Розклад
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Додавання Розкладу</DialogTitle>
          <DialogDescription className="mb-6">
            Створіть розклад для цього курсу
          </DialogDescription>
        </DialogHeader>

        <CreateLessonsAutoForm
          course={course}
          handleClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddLessons;
