import { Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import type { CoursePlain } from "../../schemas/coursesSchema";
import { useUser } from "../../contexts/user/useUser";

function CourseCardActions({ course }: { course?: CoursePlain }) {
  const { user } = useUser();

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
