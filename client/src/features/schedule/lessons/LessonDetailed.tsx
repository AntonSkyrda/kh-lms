import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useLesson } from "./useLesson";
import type { CustomExtendedProps } from "../../../types/eventTypes";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import CreateHomeworkForm from "../../homeworks/CreateHomeworkForm";
import Empty from "../../../ui/Empty";

interface LessonDetailedProps {
  lessonId: number;
  eventProps: CustomExtendedProps;
}

function LessonDetailed({ lessonId, eventProps }: LessonDetailedProps) {
  const { lesson, isLoading } = useLesson(lessonId);

  if (!lesson)
    return (
      <DialogContent>
        <Empty resourceName="Заняття" />
      </DialogContent>
    );

  return (
    <DialogContent>
      {isLoading ? (
        <SpinnerMini size="lg" />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Урок за темою {lesson?.program_topic}</DialogTitle>
            <DialogDescription>
              {eventProps.pairLabel}{" "}
              {lesson?.teacher_name ? (
                <>
                  з курсу <em>{lesson.course_name}</em>, у викладача{" "}
                  <em>{lesson.teacher_name}</em>{" "}
                </>
              ) : (
                ""
              )}
              <br />
              Група -{" "}
              <Link to={`/groups?groupId=${lesson?.group}`}>
                <em>{lesson?.group_name}</em>
              </Link>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Опис</CardTitle>
              </CardHeader>
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
            <div>Присутність:</div>
            <Card>
              <CardHeader>
                <CardTitle>Домашнє завдання</CardTitle>
                <CardDescription>
                  Додайте домашнє завдання для студентів до цього заняття
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateHomeworkForm lessonId={lesson?.id} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </DialogContent>
  );
}

export default LessonDetailed;
