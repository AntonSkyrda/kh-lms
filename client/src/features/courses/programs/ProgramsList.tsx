import { useState } from "react";
import type { CourseProgram } from "../../../schemas/coursesSchema";
import type { User } from "../../../schemas/userSchemas";
import Empty from "../../../ui/Empty";
import Heading from "../../../ui/Heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import CourseProgramForm from "./CourseProgramForm";
import { Button, buttonVariants } from "../../../ui/button";
import { cn } from "../../../lib/utils/cn";
import { Pencil, Trash } from "lucide-react";

interface ProgramsListProps {
  courseId: number;
  programs: CourseProgram[];
  user: User;
}

function ProgramsList({ courseId, programs, user }: ProgramsListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (!courseId) return null;

  return (
    <div className="flex flex-col items-baseline gap-8">
      <Heading as="h4">Програма:</Heading>
      <Table className="fixed-table w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-4/6">Тема</TableHead>
            <TableHead className="w-1/6 text-center">Кількість Годин</TableHead>
            <TableHead className="w-1/6 text-center">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.length > 0 ? (
            programs.map((program) =>
              editingId === program.id ? (
                <CourseProgramForm
                  key={program.id}
                  programs={programs}
                  programToEdit={program}
                  user={user}
                />
              ) : (
                <TableRow key={program.id}>
                  <TableCell className="w-4/6">{program.topic}</TableCell>
                  <TableCell className="w-1/6 text-center">
                    {program.hours}
                  </TableCell>
                  <TableCell className="w-1/6 text-center">
                    <div className="flex h-full items-center justify-center gap-5">
                      <Button
                        variant="secondary"
                        onClick={() => setEditingId(program.id)}
                      >
                        <Pencil className="stroke-norway-50" />
                      </Button>
                      <Button variant="destructive">
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )
          ) : (
            <TableRow>
              <TableCell>
                <Empty resourceName="Програму" />
              </TableCell>
            </TableRow>
          )}
          {!isAdding ? (
            <TableRow>
              <TableCell colSpan={3} className="text-right">
                <span
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "cursor-pointer",
                  )}
                  onClick={() => setIsAdding((adding) => !adding)}
                >
                  Додати Тему
                </span>
              </TableCell>
            </TableRow>
          ) : (
            <CourseProgramForm programs={programs} user={user} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProgramsList;
