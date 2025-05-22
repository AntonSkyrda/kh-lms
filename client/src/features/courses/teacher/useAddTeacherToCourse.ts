import { useRecourceRelatedMutation } from "../../../hooks/useResourceRelatedMutation";
import ApiCourses from "../../../lib/services/apiCourses";

export function useAddTeacherToCourse() {
  const {
    mutate: addTeacherToCourse,
    isPending,
    error: addTeacherToCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, teacherId: number) =>
      ApiCourses.addTeacher(courseId, teacherId),
    successMessage: (course) =>
      `До курсу ${course.name} успішно додано викладача ${course.teacher?.full_name}`,
  });

  return { addTeacherToCourse, isPending, addTeacherToCourseError };
}
