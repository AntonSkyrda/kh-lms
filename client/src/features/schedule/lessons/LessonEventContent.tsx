import type { EventContentArg } from "@fullcalendar/core";
import type { CustomExtendedProps } from "../../../types/eventTypes";
import { Dialog, DialogTrigger } from "../../../ui/dialog";
import { Info } from "lucide-react";
import LessonDetailed from "./LessonDetailed";

interface EventContentProps {
  eventInfo: EventContentArg;
}

function EventContent({ eventInfo }: EventContentProps) {
  const { event } = eventInfo;
  const extendedProps = event.extendedProps as CustomExtendedProps;

  return (
    <Dialog>
      <div className="flex flex-col items-start justify-start gap-1 overflow-auto p-1">
        <div className="flex flex-row items-center gap-1">
          <p className="text-primary-foreground/90 text-xs font-bold">
            {extendedProps.pairLabel}
          </p>

          <DialogTrigger asChild>
            <Info />
          </DialogTrigger>
          <LessonDetailed
            lessonId={extendedProps.lesson.id}
            eventProps={extendedProps}
          />
        </div>

        <p className="text-primary-foreground truncate text-xs font-semibold">
          {event.title}
        </p>

        <p className="text-primary-foreground/80 truncate text-xs">
          {extendedProps.course}
        </p>

        <p className="text-primary-foreground/70 truncate text-xs">
          {extendedProps.teacher}
        </p>

        <p className="text-primary-foreground/70 truncate text-xs">
          Група: {extendedProps.group}
        </p>
      </div>
    </Dialog>
  );
}

export default EventContent;
