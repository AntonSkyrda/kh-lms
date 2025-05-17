import {
  coursesListResponseSchema, type CoursesListResponse
} from "../../schemas/coursesSchema";
import ApiBase from "./apiBase";

class ApiCourses extends ApiBase {
  private readonly BASE_PATH = "/courses";

  public async getCourses() {
    return await this.get<CoursesListResponse>(
      this.BASE_PATH,
      coursesListResponseSchema
    )
  }
}

export default new ApiCourses()

// export const getCourses = (offset: number = 0) =>
//   interactWithAPI<typeof coursesSchema, object>({
//     url: `courses?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
//     method: "get",
//     schema: coursesSchema,
//     methodErrorMessage: "Сталася помилка при отриманні курсів.",
//     serverErrorRecourseName: "Courses",
//   });

// export const findCourses = (searchStr: string = "") =>
//   interactWithAPI<typeof coursesSchema, object>({
//     url: `courses?search=${searchStr}`,
//     method: "get",
//     schema: coursesSchema,
//     methodErrorMessage: "Сталася помилка при отриманні курсів.",
//     serverErrorRecourseName: "Courses",
//   });

// export const getCourseById = (id: string) =>
//   interactWithAPI<typeof courseDetailedSchema, object>({
//     url: `courses/${id}/`,
//     method: "get",
//     schema: courseDetailedSchema,
//     methodErrorMessage: "Такого курсу не існує!",
//     serverErrorRecourseName: "Course",
//   });

// export const addCourse = (data: z.infer<typeof courseFormSchema>) =>
//   interactWithAPI<typeof coursePlainSchema, z.infer<typeof courseFormSchema>>({
//     url: "courses/",
//     method: "post",
//     schema: coursePlainSchema,
//     data,
//     methodErrorMessage: "Не вдалось додати новий курс!",
//     serverErrorRecourseName: "Course",
//   });

// export const updateCourse = (
//   data: z.infer<typeof courseUpdateSchemaPartial>,
//   id: number,
// ) =>
//   interactWithAPI<
//     typeof coursePlainPartialSchema,
//     z.infer<typeof courseUpdateSchemaPartial>
//   >({
//     url: `courses/${id}`,
//     method: "patch",
//     schema: coursePlainPartialSchema,
//     data,
//     methodErrorMessage: "Не вдалось оновити цей курс!",
//     serverErrorRecourseName: "Course",
//   });

// export const deleteCourse = (id: number) =>
//   interactWithAPI<z.ZodVoid, object>({
//     url: `courses/${id}`,
//     method: "delete",
//     schema: z.void(),
//     methodErrorMessage: "Не вдалось видалити цей курс!",
//     serverErrorRecourseName: "Course",
//   });

// export const addTeacherToCourse = (courseId: number, teacherId: number) =>
//   interactWithAPI<typeof courseDetailedSchema, object>({
//     url: `courses/${courseId}/add-teacher/${teacherId}`,
//     method: "post",
//     schema: courseDetailedSchema,
//     methodErrorMessage: "Не вдалось додати викладача до цього курс!",
//     serverErrorRecourseName: "Course",
//   });

// export const removeTeacherFromCourse = (courseId: number) =>
//   interactWithAPI<typeof courseDetailedSchema, object>({
//     url: `courses/${courseId}/teacher`,
//     method: "delete",
//     schema: courseDetailedSchema,
//     methodErrorMessage: "Не вдалось видалити викладача до цього курсу!",
//     serverErrorRecourseName: "Course",
//   });

// export const addGroupToCourse = (
//   courseId: number | string,
//   groupId: number | string,
// ) =>
//   interactWithAPI<typeof courseDetailedSchema, object>({
//     url: `courses/${courseId}/groups/${groupId}`,
//     method: "post",
//     schema: courseDetailedSchema,
//     methodErrorMessage: "Не вдалось додати групу до цього курсу!",
//     serverErrorRecourseName: "Course",
//   });

// export const removeGroupFromCourse = (
//   courseId: number | string,
//   groupId: number | string,
// ) =>
//   interactWithAPI<typeof courseDetailedSchema, object>({
//     url: `courses/${courseId}/groups/${groupId}`,
//     method: "delete",
//     schema: courseDetailedSchema,
//     methodErrorMessage: "Не вдалось видалити групу з цього курсу!",
//     serverErrorRecourseName: "Course",
//   });
