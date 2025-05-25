import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import type { Lesson } from "../../schemas/lessonsSchema";

interface ScheduleCalendarProps {
  lessons: Lesson[];
}

function ScheduleCalendar({ lessons }: ScheduleCalendarProps) {
  const events = lessons.map((lesson) => {
    return {
      id: String(lesson.id),
      title: lesson.program_topic,
      start: `${lesson.date}T${lesson.time}`,
      end: `${lesson.date}T${lesson.time}`,
      description: `Курс: ${lesson.course_name},Викладач: ${lesson.teacher_name}, Група: ${lesson.group_name}`,
      extendedProps: {
        group: lesson.group,
        program: lesson.program,
        course: lesson.course_name,
        teacher: lesson.teacher_name,
      },
    };
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      locale="ua"
      buttonText={{
        today: "Сьогодні",
        month: "Місяць",
        week: "Тиждень",
        day: "День",
      }}
      height="100vh"
      events={events}
      eventClick={(event) => console.log(event)}
      // eventClick={event => }
      // eventContent={{}}
    />
  );
}

export default ScheduleCalendar;
