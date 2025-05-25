import { useState, useCallback } from "react";
import { Pencil, Plus, Trash } from "lucide-react";

import type { CourseProgram } from "../../../schemas/coursesSchema";
import type { User } from "../../../schemas/usersSchema";
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
import { useDeleteProgram } from "./useDeleteProgram";

interface ProgramsListProps {
  courseId: number;
  programs: CourseProgram[];
  user: User;
}

type SetOpenFunction = (value: boolean | number | null) => void;

function ProgramsList({ courseId, programs, user }: ProgramsListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { deleteProgram } = useDeleteProgram();

  const handleSetEditingId: SetOpenFunction = useCallback((value) => {
    if (typeof value === "boolean") {
      if (!value) {
        setEditingId(null);
      }
    } else {
      setEditingId(value as number | null);
    }
  }, []);

  const handleSetIsAdding: SetOpenFunction = useCallback((value) => {
    if (typeof value === "boolean") {
      setIsAdding(value);
    } else if (value === null) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  }, []);

  if (!courseId) return null;

  const AddButton = () => (
    <TableRow>
      <TableCell colSpan={3} className="text-right">
        <span
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "cursor-pointer",
          )}
          onClick={() => setIsAdding(true)}
        >
          <span>
            <Plus />{" "}
          </span>
          Додати Тему
        </span>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col items-baseline gap-8">
      <Heading as="h4">Програма курсу:</Heading>
      <Table className="fixed-table w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-4/6">Тема</TableHead>
            <TableHead className="w-1/6">Кількість Годин</TableHead>
            <TableHead className="w-1/6 text-center">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&>tr]:h-20">
          {programs.length > 0 ? (
            programs.map((program) =>
              editingId === program.id ? (
                <CourseProgramForm
                  key={program.id + "-edit"}
                  programs={programs}
                  programToEdit={program}
                  user={user}
                  isOpen={editingId === program.id}
                  setIsOpen={handleSetEditingId}
                />
              ) : (
                <TableRow key={program.id}>
                  <TableCell className="w-4/6">{program.topic}</TableCell>
                  <TableCell className="w-1/6">{program.hours}</TableCell>
                  <TableCell className="w-1/6 text-center">
                    <div className="flex h-full items-center justify-center gap-5 divide-x-2 divide-black">
                      <div className="flex flex-row gap-5 px-5">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setIsAdding(false);
                            setEditingId(program.id);
                          }}
                        >
                          <Pencil className="stroke-norway-50" />
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            deleteProgram({
                              data: {
                                programs,
                                programToDeleteId: program.id,
                              },
                            })
                          }
                        >
                          <Trash />
                        </Button>
                      </div>
                      <Button>
                        <Plus />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Empty resourceName="Програму" />
              </TableCell>
            </TableRow>
          )}

          {isAdding ? (
            <CourseProgramForm
              key="add-program"
              programs={programs}
              user={user}
              isOpen={isAdding}
              setIsOpen={handleSetIsAdding}
            />
          ) : (
            <AddButton />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProgramsList;
