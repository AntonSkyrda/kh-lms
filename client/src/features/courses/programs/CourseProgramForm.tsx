import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { Button, buttonVariants } from "../../../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../../../ui/form";
import {
  courseProgramFormSchema,
  type CourseProgram,
  type CourseProgramFormValues,
} from "../../../schemas/coursesSchema";
import { useAddProgram } from "./useAddProgram";
import { useEditProgram } from "./useEditProgram";
import { Input } from "../../../ui/input";
import SpinnerMini from "../../../ui/SpinnerMini";
import { cn } from "../../../lib/utils/cn";
import { TableCell, TableRow } from "../../../ui/table";
import type { User } from "../../../schemas/userSchemas";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface AddProgramToCourseProps {
  programs: CourseProgram[];
  programToEdit?: CourseProgram;
  user: User;
  isOpen: boolean;
  setIsOpen: (open: boolean | number | null) => void;
}

function CourseProgramForm({
  programs,
  programToEdit,
  user,
  isOpen,
  setIsOpen,
}: AddProgramToCourseProps) {
  const { id: editId, ...editValues } = programToEdit ?? {};

  const isEditSession = Boolean(editId);

  const { addProgram, isPending: isAdding } = useAddProgram();

  const { editProgram, isPending: isEditing } = useEditProgram();

  const isLoading = isAdding || isEditing;

  const form = useForm<CourseProgramFormValues>({
    resolver: zodResolver(courseProgramFormSchema),
    defaultValues: isEditSession ? editValues : { topic: "", hours: 1 },
  });

  const handleOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
      form.reset();
    }
  };

  const formRef = useOutsideClick<HTMLTableRowElement>(handleOutsideClick);

  useEffect(
    function () {
      if (!isOpen) {
        form.reset();
      }
    },
    [isOpen, form],
  );

  function onSubmit(data: FieldValues) {
    const { topic, hours } = data;
    if (isEditSession && typeof editId === "number") {
      if (topic === programToEdit?.topic && hours === programToEdit?.hours)
        return;
      editProgram({ programs, updatedProgram: { id: editId, topic, hours } });
    } else {
      addProgram({ programs, newProgram: { topic, hours } });
    }
    form.reset();
    setIsOpen(false);
  }

  const allowedUsers = ["admin", "teacher"];
  const canEdit = user && allowedUsers.includes(user.role);

  if (!canEdit || !isOpen) return null;

  return (
    <Form {...form}>
      <TableRow ref={formRef}>
        <TableCell className="w-4/6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <Input
                  className="w-2/3"
                  type="text"
                  id="topic"
                  placeholder="Назва теми"
                  autoFocus
                  disabled={isLoading}
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </TableCell>

        <TableCell className="w-1/6">
          <FormField
            name="hours"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem className="flex flex-row items-center justify-start gap-5">
                <Input
                  className="w-1/3"
                  type="number"
                  id="hours"
                  disabled={isLoading}
                  name={name}
                  ref={ref}
                  value={value}
                  step="1"
                  min="1"
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val ? parseFloat(val) : 0);
                  }}
                  onBlur={onBlur}
                />
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </TableCell>

        <TableCell className="w-1/6 p-0 text-center">
          <div className="flex h-full items-center justify-center gap-5">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <SpinnerMini />
              ) : isEditSession ? (
                "Оновити"
              ) : (
                "Додати"
              )}
            </Button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer",
              )}
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>
        </TableCell>
      </TableRow>
    </Form>
  );
}

export default CourseProgramForm;
