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
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

interface LessonDetailedProps {
  lessonId: number;
  eventProps: CustomExtendedProps;
}

function LessonDetailed({ lessonId, eventProps }: LessonDetailedProps) {
  const { lesson, isLoading } = useLesson(lessonId);

  return (
    <DialogContent>
      {isLoading ? (
        <SpinnerMini size="lg" />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Урок {lesson?.program_topic}</DialogTitle>
            <DialogDescription>
              {eventProps.pairLabel}{" "}
              {lesson?.teacher_name ? (
                <p className="inline">
                  у викладача<em>{lesson.teacher_name}</em>
                </p>
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
            <div>Домашнє завдання:</div>
          </div>
        </>
      )}
    </DialogContent>
  );
}

export default LessonDetailed;
