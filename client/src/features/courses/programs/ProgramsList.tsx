import type { CourseProgram } from "../../../schemas/coursesSchema";
import type { User } from "../../../schemas/userSchemas";
import Empty from "../../../ui/Empty";
import Heading from "../../../ui/Heading";
import AddProgramToCourse from "./CourseProgramForm";

interface ProgramsListProps {
  courseId: number;
  programs: CourseProgram[];
  user: User;
}

function ProgramsList({ courseId, programs, user }: ProgramsListProps) {
  if (!courseId) return null;

  return (
    <div className="flex flex-col items-baseline gap-8">
      <Heading as="h4">Програма:</Heading>
      {programs.length > 0 ? (
        <ul>
          {programs.map((program) => (
            <li key={program.id}>{program.topic}</li>
          ))}
        </ul>
      ) : (
        <Empty resourceName="Програму" />
      )}
      <AddProgramToCourse user={user} programs={programs} />
    </div>
  );
}

export default ProgramsList;
