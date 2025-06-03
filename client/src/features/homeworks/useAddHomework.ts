import { format } from "date-fns";
import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import ApiHomeworks from "../../lib/services/apiHomeworks";
import type {
  CreateHomeworkFormValues,
  HomeworkDetailed,
} from "../../schemas/homeworksSchema";

export function useAddHomework() {
  const {
    mutate: addHomework,
    isPending,
    error,
  } = useRecourceRelatedMutation<CreateHomeworkFormValues, HomeworkDetailed>({
    paramName: "lessonId",
    mutationFn: (lessonId: number, params: CreateHomeworkFormValues) => {
      const formattedParams = {
        ...params,
        due_date: format(params.due_date, "yyyy-MM-dd"),
      };
      return ApiHomeworks.add(
        lessonId,
        formattedParams as CreateHomeworkFormValues & { due_date: string },
      );
    },
    successMessage: (homework) =>
      `До Заннятя ${homework.lesson} успішно додано Завдання`,
  });

  return { addHomework, isPending, error };
}
