import { useState } from "react";
import { Pencil } from "lucide-react";

import { buttonVariants } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import CurseForm from "./CurseForm";
import type { CourseDetailed, CoursePlain } from "../../schemas/coursesSchema";
import type { User } from "../../schemas/usersSchema";

interface UpdateCourseProps {
  course: CourseDetailed | CoursePlain;
  user: User;
}

function UpdateCourse({ course, user }: UpdateCourseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const allowedUsers = ["admin", "teacher"];

  if (!user || !allowedUsers.includes(user?.role)) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <span>
          <Pencil />
        </span>
        Редагувати курс
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редагування курсу {course.name}</DialogTitle>
          <DialogDescription className="mb-6">
            Оновіть дані про курс.
          </DialogDescription>
        </DialogHeader>
        <CurseForm
          isOpen={isOpen}
          handleClose={setIsOpen}
          courseToEdit={course as CoursePlain}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCourse;
