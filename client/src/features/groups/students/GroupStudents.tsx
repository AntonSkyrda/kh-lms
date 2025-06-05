import { ExternalLink, Minus } from "lucide-react";
import { Link } from "react-router-dom";

import { type GroupDetailed } from "../../../schemas/groupsSchema";
import { useRemoveStudentFromGroup } from "./useRemoveStudentFromGroup";
import { useUser } from "../../../contexts/user/useUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import Empty from "../../../ui/Empty";
import { cn } from "../../../lib/utils/cn";
import { Button, buttonVariants } from "../../../ui/button";

interface GroupStudentsProps {
  group: GroupDetailed;
}

function GroupStudents({ group }: GroupStudentsProps) {
  const { user } = useUser();
  const isActionAvailable = user?.role === "admin";

  const { removeStudentFromGroup } = useRemoveStudentFromGroup();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Імʼя</TableHead>
          <TableHead>Прізвище</TableHead>
          <TableHead>По-батькові</TableHead>
          <TableHead>Email</TableHead>
          {isActionAvailable && (
            <TableHead className="w-1/12 text-center">Дії</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {group.students[0] ? (
          group.students.map((student) => (
            <TableRow key={student.id}>
              {student.full_name.split(" ").map((value) => (
                <TableCell key={`${student.id}-${value}`}>{value}</TableCell>
              ))}
              <TableCell>{student.email}</TableCell>
              {isActionAvailable && (
                <TableCell className="flex flex-row gap-3">
                  <Link
                    className={cn(buttonVariants({ variant: "outline" }))}
                    to={``}
                  >
                    <ExternalLink />
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      removeStudentFromGroup({
                        id: group.id,
                        data: {
                          students: group.students,
                          studentToRemoveId: student.id,
                        },
                      })
                    }
                  >
                    <Minus />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <Empty resourceName="Студентів" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default GroupStudents;
