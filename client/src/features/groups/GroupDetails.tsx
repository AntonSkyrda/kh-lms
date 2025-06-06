import { NavLink } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
import GroupStudents from "./students/GroupStudents";
import { useGroup } from "./useGroup";
import { badgeVariants } from "../../ui/badge";
import UpdateGroup from "./UpdateGroup";
import DeleteGroup from "./DeleteGroup";
import AddStudentToGroup from "./students/AddStudentToGroup";

function GroupDetails() {
  const { group, isLoading } = useGroup();

  if (isLoading)
    return (
      <Card className="flex h-2/3 items-center justify-center">
        <SpinnerMini size="xl" />
      </Card>
    );

  if (!group) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>
          <Heading as="h3">{group?.name}</Heading>
        </CardTitle>
        <div className="space-x-5">
          <UpdateGroup group={group} />
          <DeleteGroup group={group} />
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-row items-baseline gap-5">
          <Heading as="h4">Рік навчання:</Heading> <p>{group.year_of_study}</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Студенти</CardTitle>
            <CardDescription>Список студентів цієї групи...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <AddStudentToGroup group={group} />
            <GroupStudents group={group} />
          </CardContent>
        </Card>

        <div className="flex flex-row items-center gap-5">
          <Heading as="h4">Курси групи:</Heading>
          <ul className="flex flex-wrap gap-3">
            {group.courses.map((course) => (
              <li key={course.id}>
                <NavLink
                  to={`/courses/${course.id}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {course.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupDetails;
