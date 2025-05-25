import { useState } from "react";
import CoursesActions from "../features/courses/CoursesActions";
import CoursesList from "../features/courses/CoursesList";
import { useCourses } from "../features/courses/useCourses";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";
import CoursesSearch from "../features/courses/CoursesSearch";

function Courses() {
  const [searchStr, setSearchStr] = useState("");
  const { totalCourses, courses, isLoading, coursesError } =
    useCourses(searchStr);

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-10 px-10 py-4">
      <PageHeader title="Курси">
        <div className="flex flex-row items-center gap-10">
          <CoursesSearch
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            courses={courses}
            isLoading={isLoading}
          />
          <CoursesActions />
        </div>
      </PageHeader>
      <CoursesList
        courses={courses}
        isLoading={isLoading}
        coursesError={coursesError}
      />
      <PaginationComponent total={totalCourses!} />
    </div>
  );
}

export default Courses;
