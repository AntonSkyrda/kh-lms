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
import CreateLessonsAutoForm from "./CreateLessonAutoForm";
import { useUser } from "../../../contexts/user/useUser";
import { cn } from "../../../lib/utils/cn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import CreateSingleLessonForm from "./CreateSingleLessonForm";

function AddLesson() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const allowedUsers = ["admin", "teacher"];

  if (!user || !allowedUsers.includes(user?.role)) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "default" }), "ml-auto")}
      >
        <span>
          <Plus />
        </span>
        Додати урок
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Додавання Розкладу</DialogTitle>
          <DialogDescription className="mb-6">
            Створіть розклад для цього курсу
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="auto">
          <TabsList>
            <TabsTrigger value="single">В ручну</TabsTrigger>
            <TabsTrigger value="auto">Автоматично</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <CreateSingleLessonForm handleClose={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="auto">
            <CreateLessonsAutoForm handleClose={() => setIsOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AddLesson;
