import type { Lesson } from "../../../schemas/lessonsSchema";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import RemoveLesson from "./RemoveLesson";

interface LessonOverviewProps {
  lesson: Lesson;
  handleClose: () => void;
}

function LessonOverview({ lesson, handleClose }: LessonOverviewProps) {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Опис</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p>{lesson.program_topic}</p>
          <div>
            <RemoveLesson lesson={lesson} handleClose={handleClose} />
          </div>
        </CardContent>
      </Card>
      <div>Посилання:</div>
      <Card>
        <CardHeader>
          <CardTitle>Почати пару</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-8">
          <Button>Онлайн</Button>
          <Button variant="outline">Офлайн</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LessonOverview;
