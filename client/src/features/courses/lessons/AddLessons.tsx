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
import CreateLessonsForm from "../../schedule/CreateLessonForm";
import type { CourseDetailed } from "../../../schemas/coursesSchema";

interface AddLessonsProps {
  course: CourseDetailed;
}

function AddLessons({ course }: AddLessonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <span>
          <Plus />
        </span>
        Створити Розклад
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додавання Розкладу</DialogTitle>
          <DialogDescription className="mb-6">
            Створіть розклад для цього курсу
          </DialogDescription>
        </DialogHeader>

        <CreateLessonsForm course={course} />
      </DialogContent>
    </Dialog>
  );
}

export default AddLessons;
