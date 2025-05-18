import { ZodSchema } from "zod";
import {
  courseCreateFormSchema,
  courseDetailedSchema,
  coursesListResponseSchema,
  courseUpdateFormSchema,
  type CourseCreateFormValues,
  type CourseDetailed,
  type CourseProgram,
  type CourseProgramFormValues,
  type CoursesListResponse,
  type CourseUpdateFormValues,
} from "../../schemas/coursesSchema";
import ApiBase from "./apiBase";

class ApiCourses extends ApiBase {
  private readonly BASE_PATH = "/courses/";

  public getCourses = async (): Promise<CoursesListResponse> =>
    await this.get<CoursesListResponse>(
      this.BASE_PATH,
      coursesListResponseSchema as ZodSchema,
      "Не вдалось отримати курси",
    );

  public getCourse = async (id: number): Promise<CourseDetailed> =>
    await this.get<CourseDetailed>(
      `${this.BASE_PATH}${id}/`,
      courseDetailedSchema as ZodSchema,
      "Такого курсу не існує",
    );

  public add = async (data: CourseCreateFormValues): Promise<CourseDetailed> =>
    await this.post<CourseDetailed, CourseCreateFormValues>(
      this.BASE_PATH,
      data,
      courseCreateFormSchema as ZodSchema,
      "Не вдалось створити курс",
    );

  public update = async (
    data: CourseUpdateFormValues,
    id: number,
  ): Promise<CourseDetailed> =>
    await this.patch<CourseDetailed, CourseUpdateFormValues>(
      `${this.BASE_PATH}${id}/`,
      data,
      courseUpdateFormSchema as ZodSchema,
      "Не вдалось оновити курс",
    );

  public deleteCourse = async (id: number): Promise<void> =>
    await this.delete(`${this.BASE_PATH}${id}/`, "Не вдалось видалити курс");

  public addTeacher = async (
    courseId: number,
    teacherId: number,
  ): Promise<CourseDetailed> =>
    await this.patch(
      `${this.BASE_PATH}${courseId}/`,
      { teacher_id: teacherId },
      courseDetailedSchema,
      "Не вдалось додати викладача до курсу",
    );

  public removeTeacher = async (courseId: number): Promise<CourseDetailed> =>
    await this.patch(
      `${this.BASE_PATH}${courseId}/`,
      { teacher_id: null },
      courseDetailedSchema,
      "Не вдалось видалити викладача з курсу",
    );

  public addProgram = async (
    courseId: number,
    programs: CourseProgram[],
    newProgram: CourseProgramFormValues,
  ): Promise<CourseDetailed> => {
    const newPrograms = { programs: [...programs, newProgram] };

    const res = await this.patch(
      `${this.BASE_PATH}${courseId}`,
      newPrograms,
      courseDetailedSchema,
      "Не вдалось додати нову програму до курсу",
    );

    return res;
  };

  public editProgram = async (
    courseId: number,
    programs: CourseProgram[],
    updatedProgram: CourseProgramFormValues,
  ): Promise<CourseDetailed> => {
    const updatedPrograms = { programs: [...programs, updatedProgram] };

    const res = await this.patch(
      `${this.BASE_PATH}${courseId}`,
      updatedPrograms,
      courseDetailedSchema,
      "Не вдалось оновити програму для курсу",
    );

    return res;
  };

  public deleteProgram = async (
    courseId: number,
    programs: CourseProgram[],
    programToDeleteId: number,
  ) => {
    const updatedPrograms = {
      programs: programs.filter((program) => program.id !== programToDeleteId),
    };

    return await this.patch(
      `${this.BASE_PATH}${courseId}`,
      updatedPrograms,
      courseDetailedSchema,
      "Не вдалось видалити програму для курсу",
    );
  };
}

export default new ApiCourses();

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
