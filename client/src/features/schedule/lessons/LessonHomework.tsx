import type { Lesson } from "../../../schemas/lessonsSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import CreateHomeworkForm from "../../homeworks/CreateHomeworkForm";

interface LessonHomeworkProps {
  lesson: Lesson;
}

function LessonHomework({ lesson }: LessonHomeworkProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Домашнє завдання</CardTitle>
        <CardDescription>
          Додайте домашнє завдання для студентів до цього заняття
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateHomeworkForm lessonId={lesson.id} />
      </CardContent>
    </Card>
  );
}

export default LessonHomework;
