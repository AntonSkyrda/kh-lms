import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ApiCourses from "../../lib/services/apiCourses";
import type { CourseFormValues } from "../../schemas/coursesSchema";

export function useAddCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: addCourse,
    isPending,
    error: addCourseError,
  } = useMutation({
    mutationFn: (data: CourseFormValues) => ApiCourses.add(data),
    onSuccess: (course) => {
      toast.success(`Курс ${course.name} успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addCourse, isPending, addCourseError };
}
