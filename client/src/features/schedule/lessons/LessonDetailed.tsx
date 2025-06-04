import { Link } from "react-router-dom";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useLesson } from "./useLesson";
import type { CustomExtendedProps } from "../../../types/eventTypes";
import Empty from "../../../ui/Empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import LessonOverview from "./LessonOverview";
import LessonAttendance from "./LessonAttendance";
import LessonHomework from "./LessonHomework";

interface LessonDetailedProps {
  lessonId: number;
  eventProps: CustomExtendedProps;
  handleClose: () => void;
}

function LessonDetailed({
  lessonId,
  eventProps,
  handleClose,
}: LessonDetailedProps) {
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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Огляд</TabsTrigger>
              <TabsTrigger value="attendance">Присутність</TabsTrigger>
              <TabsTrigger value="homework">Завдання</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <LessonOverview lesson={lesson} handleClose={handleClose} />
            </TabsContent>
            <TabsContent value="attendance">
              <LessonAttendance />
            </TabsContent>
            <TabsContent value="homework">
              <LessonHomework lesson={lesson} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </DialogContent>
  );
}

export default LessonDetailed;
