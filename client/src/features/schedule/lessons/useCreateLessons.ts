import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { GeneratedLesson } from "../../../types/schedule";
import ApiLessons from "../../../lib/services/apiLessons";

export function useCreateLessons() {
  const queryClient = useQueryClient();

  const {
    mutate: addLessons,
    isPending,
    error: addLessonsError,
  } = useMutation({
    mutationFn: (data: Omit<GeneratedLesson, "extendedValues">[]) =>
      Promise.all([data.map((lesson) => ApiLessons.createLesson(lesson))]),
    onSuccess: () => {
      toast.success(`Розклад успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["courses"] });
      queryClient.refetchQueries({ queryKey: ["lessons"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addLessons, isPending, addLessonsError };
}
