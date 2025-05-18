import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import ApiCourses from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { courseUpdateSchemaPartial } from "../../schemas/formsSchemas";
import { useParams } from "react-router-dom";

type UpdateData = z.infer<typeof courseUpdateSchemaPartial>;
export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    mutate: updateCourse,
    isPending,
    error: updateCourseError,
  } = useMutation({
    mutationFn: ({ data, id }: { data: UpdateData; id: number }) =>
      ApiCourses.update(data, id),
    onSuccess: (course) => {
      toast.success(`Курс ${course.name} успішно оновленно!`);
      if (courseId)
        queryClient.invalidateQueries({
          queryKey: ["course", courseId],
        });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCourse, isPending, updateCourseError };
}
