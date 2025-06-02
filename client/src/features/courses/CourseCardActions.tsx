import { Calendar } from "lucide-react";
import { Button, buttonVariants } from "../../ui/button";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import type { CoursePlain } from "../../schemas/coursesSchema";
import { useUser } from "../../contexts/user/useUser";
import { Link } from "react-router-dom";

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
      <Link
        className={buttonVariants({ variant: "outline" })}
        to={`/schedule?course=${course?.id}`}
      >
        <span>
          <Calendar />
        </span>
        Розклад
      </Link>
    </div>
  );
}

export default CourseCardActions;
