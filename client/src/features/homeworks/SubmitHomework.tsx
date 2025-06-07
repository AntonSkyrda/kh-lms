import { useForm, type FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useSubmitHomework } from "./useSubmitHomework";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitHomeworkFormForStudentSchema } from "../../schemas/homeworksSchema";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

interface SubmitHomeworkProps {
  homeworkId: number;
}

function SubmitHomework({ homeworkId }: SubmitHomeworkProps) {
  const { submitHomework, isPending } = useSubmitHomework();

  const form = useForm({
    resolver: zodResolver(submitHomeworkFormForStudentSchema),
    defaultValues: {
      answer: "",
    },
  });

  function handleSubmit(data: FieldValues) {
    const { answer } = data;

    submitHomework({ id: homeworkId, data: { answer } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="answer">
                <FormControl>
                  <Textarea
                    id="answer"
                    placeholder="1+1=2"
                    disabled={isPending}
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormLabel>
            </FormItem>
          )}
        />
        <Button>Відповісти</Button>
      </form>
    </Form>
  );
}

export default SubmitHomework;
