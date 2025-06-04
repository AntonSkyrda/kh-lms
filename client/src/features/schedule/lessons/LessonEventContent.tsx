import type { EventContentArg } from "@fullcalendar/core";
import { Info } from "lucide-react";

import type { CustomExtendedProps } from "../../../types/eventTypes";
import { Dialog, DialogTrigger } from "../../../ui/dialog";
import LessonDetailed from "./LessonDetailed";
import { useState } from "react";

function getContentByViewType(
  viewType: string,
  event: any,
  extendedProps: CustomExtendedProps,
) {
  switch (viewType) {
    case "dayGridMonth":
      return (
        <div className="text-xs">
          <p className="font-bold">{extendedProps.pairLabel}</p>
          <p className="truncate">{event.title}</p>
        </div>
      );

    case "timeGridWeek":
      return (
        <div className="space-y-1 text-xs">
          <div className="flex flex-row items-center gap-1">
            <p className="font-bold">{extendedProps.pairLabel}</p>
            <DialogTrigger asChild>
              <Info className="cursor-pointer" />
            </DialogTrigger>
          </div>
          <p className="truncate font-semibold">{event.title}</p>
          <p className="text-muted-foreground truncate">
            {extendedProps.group}
          </p>
        </div>
      );

    case "timeGridDay":
      return (
        <div className="grid grid-cols-[1fr_auto]">
          <div className="space-y-1 text-sm">
            <p className="font-bold">{extendedProps.pairLabel}</p>
            <div className="flex flex-row gap-5">
              <p className="font-semibold">Тема: {event.title}</p>
              <p className="text-muted-foreground">
                Курс: {extendedProps.course}
              </p>
            </div>
            <p className="text-muted-foreground">
              Викладач: {extendedProps.teacher}
            </p>
            <p className="text-muted-foreground">
              Група: {extendedProps.group}
            </p>
          </div>
          <DialogTrigger asChild className="ml-auto">
            <Info className="cursor-pointer" />
          </DialogTrigger>
        </div>
      );

    case "listWeek":
      return (
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-5">
          <span className="font-bold">{extendedProps.pairLabel}</span>
          <span>{event.title}</span>

          <span>{extendedProps.group}</span>
          <span>{extendedProps.course}</span>
        </div>
      );

    default:
      return null;
  }
}

interface EventContentProps {
  eventInfo: EventContentArg;
}

function EventContent({ eventInfo }: EventContentProps) {
  const { event, view } = eventInfo;
  const extendedProps = event.extendedProps as CustomExtendedProps;

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen((value) => !value);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-start justify-between overflow-auto p-1">
        {getContentByViewType(view.type, event, extendedProps)}

        {["dayGridMonth", "listWeek"].includes(view.type) && (
          <DialogTrigger asChild>
            <Info className="cursor-pointer" />
          </DialogTrigger>
        )}

        <LessonDetailed
          lessonId={extendedProps.lesson.id}
          eventProps={extendedProps}
          handleClose={handleClose}
        />
      </div>
    </Dialog>
  );
}

export default EventContent;
