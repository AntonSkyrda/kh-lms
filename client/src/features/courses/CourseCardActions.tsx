import { Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { useCurrentUser } from "../users/useCurrentUser";
import type { CoursePlain } from "../../schemas/coursesSchema";

function CourseCardActions({ course }: { course?: CoursePlain }) {
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col gap-5">
      {user && course?.id && (
        <>
          <UpdateCourse course={course} user={user} />
          <DeleteCourse course={course} user={user} />
        </>
      )}
      <Button variant="outline">
        <span>
          <Calendar />
        </span>
        Розклад
      </Button>
    </div>
  );
}

export default CourseCardActions;
