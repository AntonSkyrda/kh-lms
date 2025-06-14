import { useForm, type FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGiveGrade } from "./hooks/useGiveGrade";
import type { HomeworkSubmitStatus } from "../../schemas/homeworksSchema";

interface SubmissionFormProps {
  submission: HomeworkSubmitStatus;
}

function SubmissionForm({ submission }: SubmissionFormProps) {
  const form = useForm({
    defaultValues: {
      grade: submission.grade ?? "",
      feedback: submission.feedback ?? "",
    },
  });

  const { giveGrade, isPending } = useGiveGrade();

  function handleSubmit(data: FieldValues) {
    const { grade, feedback } = data;
    giveGrade({
      submissionId: submission.id,
      feedback,
      grade,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-12" onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-8">
          <FormField
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="grade">Оцінка</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="grade"
                    disabled={isPending}
                    {...field}
                    maxLength={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="feedback"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem>
                <FormLabel htmlFor="feedback">Коментар</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-40"
                    id="feedback"
                    name={name}
                    value={value}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <div className="flex flex-row gap-5">
          <Button type="reset" variant="outline" disabled={isPending}>
            Скасувати
          </Button>
          <Button type="submit" disabled={isPending}>
            <span>{true ? "Надіслати" : <SpinnerMini />}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubmissionForm;
