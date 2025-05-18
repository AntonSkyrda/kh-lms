import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button, buttonVariants } from "../../ui/button";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import CourseCardActions from "./CourseCardActions";
import { EllipsisVertical } from "lucide-react";
import type { CoursePlain } from "../../schemas/coursesSchema";
import { useCurrentUser } from "../users/useCurrentUser";

interface CourseCardProps {
  course: CoursePlain;
}

function CourseCard({ course }: CourseCardProps) {
  const { user } = useCurrentUser();
  return (
    <Card className="min-h-[12rem]">
      <CardHeader>
        <CardTitle className="truncate">{course.name}</CardTitle>
        {course.teacher && (
          <CardDescription>
            {course.teacher?.id === user?.id
              ? "Мій курс"
              : `Курс викладача ${course.teacher?.full_name}`}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="truncate">{course.description}</p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-row items-center justify-between">
        <NavLink
          to={`${course.id}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Більше
        </NavLink>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={8} className="w-48">
            <CourseCardActions course={course} />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
