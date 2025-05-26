import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  EventClickArg,
  EventHoveringArg,
  EventContentArg,
} from "@fullcalendar/core";

import type { Lesson } from "../../schemas/lessonsSchema";
import type {
  CustomExtendedProps,
  SlotLabelInfo,
} from "../../types/eventTypes";
import { PAIRS } from "../../lib/consts";
import EventContent from "./EventContent";

interface ScheduleCalendarProps {
  lessons: Lesson[];
}

function ScheduleCalendar({ lessons }: ScheduleCalendarProps) {
  const events = lessons.map((lesson) => {
    const pair = PAIRS.find((pair) => lesson.time.startsWith(pair.start));

    return {
      id: String(lesson.id),
      title: lesson.program_topic,
      start: `${lesson.date}T${lesson.time}`,
      end: `${lesson.date}T${pair?.end}:00`,
      allDay: false,
      extendedProps: {
        lesson,
        pairLabel: pair?.label,
        course: lesson.course_name,
        teacher: lesson.teacher_name,
        group: lesson.group_name,
      },
    };
  });

  console.log(events);

  const handleSlotLabelContent = (arg: SlotLabelInfo) => {
    const time = arg.date;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const [pairNum, pairInfo] of Object.entries(PAIRS)) {
      if (timeStr === pairInfo.start) {
        return {
          html: `<div class="text-center" style="line-height: 1.2;">
            <div style="font-weight: bold; color: var(--primary); font-size: 13px;">${pairNum} пара</div>
            <div style="font-size: 10px; opacity: 0.7; margin-top: 2px;">${pairInfo.start}</div>
            <div style="font-size: 10px; opacity: 0.7;">${pairInfo.end}</div>
          </div>`,
        };
      }
    }

    return timeStr;
  };

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
    console.log("Click:", props);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        start: "today",
        center: "prev title next",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      locale="ua"
      buttonText={{
        today: "Сьогодні",
        month: "Місяць",
        week: "Тиждень",
        day: "День",
        list: "Список",
      }}
      eventOverlap={false}
      height="100vh"
      events={events}
      eventClick={handleEventClick}
      eventContent={(eventInfo: EventContentArg) => (
        <EventContent eventInfo={eventInfo} />
      )}
      slotMinTime="08:00:00"
      slotMaxTime="19:00:00"
      slotDuration="01:30:00"
      slotLabelInterval="1:30:00"
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      slotLabelContent={handleSlotLabelContent}
      eventMouseEnter={handleEventMouseEnter}
      expandRows={true}
      stickyHeaderDates={true}
      dayMaxEvents={3}
      moreLinkClick="popover"
      dayMaxEventRows={3}
      eventDisplay="block"
      allDaySlot={false}
    />
  );
}

export default ScheduleCalendar;
