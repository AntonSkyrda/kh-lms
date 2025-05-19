import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, buttonVariants } from "../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../ui/form";
import {
  courseProgramFormSchema,
  type CourseProgram,
  type CourseProgramFormValues,
} from "../../../schemas/coursesSchema";
import { useAddProgram } from "./useAddProgram";
import { useEditProgram } from "./useEditProgram";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import SpinnerMini from "../../../ui/SpinnerMini";
import { cn } from "../../../lib/utils/cn";
import { TableCell, TableRow } from "../../../ui/table";
import type { User } from "../../../schemas/userSchemas";

interface AddProgramToCourseProps {
  programs: CourseProgram[];
  programToEdit?: CourseProgram;
  user: User;
}

function CourseProgramForm({
  programs,
  programToEdit,
  user,
}: AddProgramToCourseProps) {
  const { id: editId, ...editValues } = programToEdit ?? {};

  const isEditSession = Boolean(editId);

  const {
    addProgram,
    isPending: isAdding,
    // error: addingError,
  } = useAddProgram();

  const {
    editProgram,
    isPending: isEditing,
    // error: editingError,
  } = useEditProgram();

  const isLoading = isAdding || isEditing;

  // let error = addingError || editingError;

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CourseProgramFormValues>({
    resolver: zodResolver(courseProgramFormSchema),
    defaultValues: isEditSession ? editValues : { topic: "", hours: 0.5 },
  });

  useEffect(
    function () {
      if (isOpen === false) return () => form.reset();
      return () => {};
    },
    [isOpen, form],
  );

  function onSubmit(data: FieldValues) {
    const { topic, hours } = data;
    if (isEditSession && typeof editId === "number") {
      editProgram({ programs, updatedProgram: { id: editId, topic, hours } });
    } else {
      addProgram({ programs, newProgram: { topic, hours } });
    }
    form.reset();
    setIsOpen(false);
  }

  const allowedUsers = ["admin", "teacher"];
  const canEdit = user && allowedUsers.includes(user.role);

  if (!canEdit) return null;

  return (
    <Form {...form}>
      <TableRow className="h-[70px]">
        <TableCell className="w-4/6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <FormItem className="space-y-0">
                    <Input
                      type="text"
                      id="topic"
                      disabled={isLoading}
                      name={name}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                    />
                    <FormMessage className="text-xs" />
                  </FormItem>
                </FormControl>
              </FormItem>
            )}
          />
        </TableCell>

        <TableCell className="w-1/6 text-center">
          <FormField
            name="hours"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem className="space-y-0">
                <Input
                  type="number"
                  id="hours"
                  disabled={isLoading}
                  name={name}
                  ref={ref}
                  value={value}
                  step="0.5"
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val ? parseFloat(val) : 0);
                  }}
                  onBlur={onBlur}
                />
                <FormMessage />
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
