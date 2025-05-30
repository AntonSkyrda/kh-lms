import { useCallback, useState } from "react";
import ScheduleCalendar from "../features/schedule/ScheduleCalendar";
import { useLessons } from "../features/schedule/useLessons";
import PageHeader from "../ui/PageHeader";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { DatesSetArg } from "@fullcalendar/core/index.js";

function Schedule() {
  // Початковий стан для першого рендеру
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    return {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    };
  });

  const dateFromFormatted = format(dateRange.start, "yyyy-MM-dd");
  const dateToFormatted = format(dateRange.end, "yyyy-MM-dd");

  const { lessons, isLoading, lessonsError } = useLessons(
    dateFromFormatted,
    dateToFormatted,
  );

  // Оновлюємо дати коли календар змінюється
  const handleDatesSet = useCallback((dateInfo: DatesSetArg) => {
    setDateRange({
      start: dateInfo.start,
      end: dateInfo.end,
    });
  }, []);

  if (lessonsError) {
    return (
      <article>
        <PageHeader title="Розклад"></PageHeader>
        <div className="flex h-64 items-center justify-center">
          <p className="text-destructive">Помилка завантаження розкладу</p>
        </div>
      </article>
    );
  }

  return (
    <article>
      <PageHeader title="Розклад"></PageHeader>
      <ScheduleCalendar
        lessons={lessons || []}
        isLoading={isLoading}
        onDatesSet={handleDatesSet}
      />
    </article>
  );
}

export default Schedule;
