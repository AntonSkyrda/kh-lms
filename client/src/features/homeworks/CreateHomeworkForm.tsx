import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { createHomeworkFormSchema } from "../../schemas/homeworksSchema";
import { DatePicker } from "../../ui/DatePicker";
import { Input } from "../../ui/input";
import { useAddHomework } from "./hooks/useAddHomework";

interface CreateHomeworkFormProps {
  lessonId: number;
}

function CreateHomeworkForm({ lessonId }: CreateHomeworkFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { addHomework, isPending } = useAddHomework();
  const form = useForm({
    resolver: zodResolver(createHomeworkFormSchema),
    defaultValues: {
      due_date: new Date(),
      title: "",
      description: "",
    },
  });

  function handleFormClose() {
    form.reset();
    setIsFormOpen((value) => !value);
  }

  if (!isFormOpen)
    return (
      <Button onClick={() => setIsFormOpen((value) => !value)}>Додати</Button>
    );

  function handleSubmit(values: FieldValues) {
    const { due_date, title, description } = values;

    addHomework({
      id: lessonId,
      data: {
        due_date,
        title,
        description,
      },
    });

    handleFormClose();
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата здачі</FormLabel>
              <FormControl>
                <DatePicker
                  disabled={isPending}
                  date={field.value}
                  setDate={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="Домашня робота №1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опис</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="Потрібно виконати..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-8">
          <Button
            variant="outline"
            type="reset"
            onClick={handleFormClose}
            disabled={isPending}
          >
            Закрити
          </Button>
          <Button type="submit" disabled={isPending}>
            Створити
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateHomeworkForm;
