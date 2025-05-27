import ScheduleCalendar from "../features/schedule/ScheduleCalendar";
import { useLessons } from "../features/schedule/useLessons";
import PageHeader from "../ui/PageHeader";
import Spinner from "../ui/Spinner";

function Schedule() {
  const { lessons, isLoading } = useLessons();

  console.log(isLoading);

  return (
    <article>
      <PageHeader title="Розклад"></PageHeader>
      {isLoading ? <Spinner /> : <ScheduleCalendar lessons={lessons} />}
    </article>
  );
}

export default Schedule;
