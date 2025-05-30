import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import type {
  EventClickArg,
  EventHoveringArg,
  EventContentArg,
  DatesSetArg,
} from "@fullcalendar/core";

import type { Lesson } from "../../schemas/lessonsSchema";
import type { CustomExtendedProps } from "../../types/eventTypes";
import { PAIRS } from "../../lib/consts";
import EventContent from "./EventContent";

interface ScheduleCalendarProps {
  lessons: Lesson[];
  isLoading: boolean;
  onDatesSet: (dateInfo: DatesSetArg) => void;
}

function ScheduleCalendar({
  lessons,
  isLoading,
  onDatesSet,
}: ScheduleCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);

  const events = lessons.map((lesson) => {
    const pair = PAIRS.find((pair) => lesson.time.startsWith(pair.start));

    return {
      id: String(lesson.id),
      title: lesson.program_topic,
      start: `${lesson.date}T${lesson.time}`,
      end: `${lesson.date}T${pair?.end || "10:00"}:00`,
      allDay: false,
      extendedProps: {
        lesson,
        pairLabel: pair?.label || "",
        course: lesson.course_name,
        teacher: lesson.teacher_name,
        group: lesson.group_name,
      },
    };
  });
  
  const handleEventMouseEnter = (info: EventHoveringArg) => {
    const props = info.event.extendedProps as CustomExtendedProps;
    const startTime =
      info.event.start?.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }) || "";
    const endTime =
      info.event.end?.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }) || "";

    info.el.title = `${props.pairLabel} (${startTime} - ${endTime})\n${info.event.title}\n${props.course}\n${props.teacher}\nГрупа: ${props.group}`;
  };

  const handleEventClick = (info: EventClickArg) => {
    const props = info.event.extendedProps as CustomExtendedProps;
    console.log("Clicked lesson:", props.lesson);
  };

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        start: "today",
        center: "prev title next",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      locale={ukLocale}
      firstDay={1}
      eventOverlap={false}
      events={events}
      eventClick={handleEventClick}
      eventContent={(eventInfo: EventContentArg) => (
        <EventContent eventInfo={eventInfo} />
      )}
      slotMinTime="08:00:00"
      slotMaxTime="19:00:00"
      slotDuration="01:00:00"
      slotLabelInterval="00:05:00"
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      scrollTime="08:00:00"
      nowIndicator={true}
      eventMouseEnter={handleEventMouseEnter}
      expandRows={true}
      stickyHeaderDates={true}
      dayMaxEvents={3}
      moreLinkClick="popover"
      dayMaxEventRows={3}
      eventDisplay="block"
      allDaySlot={false}
      datesSet={onDatesSet}
      height="100vh"
      loading={() => isLoading}
    />
  );
}

export default ScheduleCalendar;
