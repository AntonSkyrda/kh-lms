import Heading from "../../ui/Heading";
import CourseGroups from "./groups/CourseGroups";
import type { CourseDetailed } from "../../schemas/coursesSchema";
import ProgramsList from "./programs/ProgramsList";
import type { User } from "../../schemas/usersSchema";
import { ItemsContainer } from "../../ui/ItemsContainer";
import RemoveTeacherFromCourse from "./teacher/RemoveTeacherFromCourse";
import AddTeacherToCourse from "./teacher/AddTeacherToCourse";

interface CourseDataBoxProps {
  course: CourseDetailed;
  user: User;
}

function CourseTeacher({ course, user }: CourseDataBoxProps) {
  if (!course.teacher?.id) return <AddTeacherToCourse />;
  if (user?.id === course.teacher?.id) return <p>Ваш курс</p>;
  return (
    <div className="flex flex-row items-baseline gap-8">
      <Heading as="h4">Викладач:</Heading>
      <span>{course.teacher.full_name}</span>
      <span>
        <RemoveTeacherFromCourse />
      </span>
    </div>
  );
}

function CourseDataBox({ course, user }: CourseDataBoxProps) {
  return (
    <article className="border-accent text-accent-foreground space-y-16 overflow-hidden rounded-md border-2 text-base shadow-md">
      <header className="flex items-center justify-between px-16 py-8 font-medium">
        <div className="flex flex-row items-baseline gap-8">
          <Heading as="h4">Курс:</Heading>
          <p>{course.name}</p>
        </div>
        <CourseTeacher course={course} user={user} />
      </header>
      <section className="flex flex-col gap-12 px-16 pb-5">
        <div className="flex flex-row items-baseline gap-8">
          <Heading as="h4">Про курс:</Heading>
          <p>{course.description}</p>
        </div>

        <ItemsContainer>
          <CourseGroups groupsFromCourse={course.groups} />
        </ItemsContainer>

        <ProgramsList
          courseId={course.id}
          programs={course.programs}
          user={user}
        />
      </section>
      <footer className="bg-accent gap-5 px-16 py-7 text-right"></footer>
    </article>
  );
}

export default CourseDataBox;
