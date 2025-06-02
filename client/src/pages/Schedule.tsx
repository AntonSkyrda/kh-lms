import { useCallback, useState } from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { DatesSetArg } from "@fullcalendar/core/index.js";
import { useSearchParams } from "react-router-dom";

import ScheduleCalendar from "../features/schedule/ScheduleCalendar";
import { useLessons } from "../features/schedule/lessons/useLessons";
import PageHeader from "../ui/PageHeader";
import ScheduleFilters from "../features/schedule/ScheduleFilters";
import AddLesson from "../features/schedule/lessons/AddLesson";

function Schedule() {
  const [searchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    return {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    };
  });

  const [selectedCourse, setSelectedCourse] = useState<number | undefined>(
    Number(searchParams.get("course")) || undefined,
  );
  const [selectedGroup, setSelectedGroup] = useState<number | undefined>(
    Number(searchParams.get("group")) || undefined,
  );

  const dateFromFormatted = format(dateRange.start, "yyyy-MM-dd");
  const dateToFormatted = format(dateRange.end, "yyyy-MM-dd");

  const { lessons, isLoading, lessonsError } = useLessons(
    dateFromFormatted,
    dateToFormatted,
    selectedCourse,
    selectedGroup,
  );

  const handleDatesSet = useCallback((dateInfo: DatesSetArg) => {
    console.log(dateInfo);
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
    <article className="flex flex-col gap-10">
      <PageHeader title="Розклад">
        <div className="flex flex-col gap-2">
          <AddLesson />
          <ScheduleFilters
            onCourseChange={setSelectedCourse}
            onGroupChange={setSelectedGroup}
          />
        </div>
      </PageHeader>
      <ScheduleCalendar
        lessons={lessons || []}
        isLoading={isLoading}
        onDatesSet={handleDatesSet}
      />
    </article>
  );
}

export default Schedule;
