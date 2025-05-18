import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import {
  courseProgramFormSchema,
  type CourseProgram,
  type CourseProgramFormValues,
} from "../../../schemas/coursesSchema";
import type { User } from "../../../schemas/userSchemas";
import { useAddProgram } from "./useAddProgram";
import { useEditProgram } from "./useEditProgram";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import SpinnerMini from "../../../ui/SpinnerMini";

interface AddProgramToCourseProps {
  user: User;
  programs: CourseProgram[];
  programToEdit?: CourseProgram;
}

function CourseProgramForm({
  user,
  programs,
  programToEdit,
}: AddProgramToCourseProps) {
  const { id: editId, ...editValues } = programToEdit ?? {};

  const isEditSession = Boolean(editId);

  const {
    addProgram,
    isPending: isAdding,
    error: addingError,
  } = useAddProgram();

  const {
    editProgram,
    isPending: isEditing,
    error: editingError,
  } = useEditProgram();

  const isLoading = isAdding || isEditing;

  const error = addingError || editingError;

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CourseProgramFormValues>({
    resolver: zodResolver(courseProgramFormSchema),
    defaultValues: isEditSession ? editValues : { topic: "", hours: 0 },
  });

  useEffect(
    function () {
      if (isOpen === false) return () => form.reset();
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

  if (!user || !allowedUsers.includes(user?.role)) return null;

  if (!isOpen)
    return (
      <Button
        variant="secondary"
        className="ml-auto"
        onClick={() => setIsOpen((open) => !open)}
      >
        Додати Тему
      </Button>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-sandy-beach-400 grid w-full grid-cols-2 items-center gap-10 rounded-2xl border-4 px-8 py-4"
      >
        <fieldset className="flex flex-row gap-18">
          <FormField
            name="topic"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem>
                <FormLabel htmlFor="topic">Назва курсу</FormLabel>
                <FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="hours"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem>
                <FormLabel htmlFor="hours">Назва курсу</FormLabel>
                <FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="ml-auto flex flex-row gap-9">
          <Button type="submit" variant="secondary">
            {isLoading ? <SpinnerMini /> : isEditSession ? "Оновити" : "Додати"}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </Button>
        </div>
        {error && (
          <div>
            <p className="text-destructive">{error.message}</p>
          </div>
        )}
      </form>
    </Form>
  );
}

export default CourseProgramForm;
