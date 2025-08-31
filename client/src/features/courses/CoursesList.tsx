import { useEffect } from "react";
import toast from "react-hot-toast";

import Empty from "../../ui/Empty";
import CourseCard from "./CourseCard";
import type { CoursePlain } from "../../schemas/coursesSchema";
import SpinnerMini from "../../ui/SpinnerMini";

interface CoursesListProps {
  courses: CoursePlain[];
  isLoading: boolean;
  coursesError: Error | null;
}

function CoursesList({ courses, isLoading, coursesError }: CoursesListProps) {
  useEffect(
    function () {
      if (coursesError) {
        console.log(coursesError);
        toast.error(coursesError.message);
      }
      return () => {};
    },
    [coursesError],
  );

  if (isLoading) return <SpinnerMini size="xl" />;
  if (!courses?.length) return <Empty resourceName="Курси" />;
  return (
    <ul className="grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ul>
  );
}

export default CoursesList;
