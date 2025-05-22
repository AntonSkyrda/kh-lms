import {
  courseDetailedSchema,
  coursesListResponseSchema,
  type CourseFormValues,
  type CourseProgram,
  type CourseProgramFormValues,
  type CourseUpdateFormValues,
} from "../../schemas/coursesSchema";
import ApiBase from "./apiBase";
import { ITEMS_PER_PAGE } from "../consts";
import type { GetListParams } from "../../types/paramsTypes";

class ApiCourses extends ApiBase {
  private readonly BASE_PATH = "/courses/";

  public getCourses = async ({
    limit = ITEMS_PER_PAGE,
    page = 0,
    search = "",
  }: GetListParams) =>
    await this.get(
      `${this.BASE_PATH}?limit=${limit}&offset=${page * limit}&search=${search}`,
      coursesListResponseSchema,
      "Не вдалось отримати курси",
    );

  public getCourse = async (id: number) =>
    await this.get(
      `${this.BASE_PATH}${id}/`,
      courseDetailedSchema,
      "Такого курсу не існує",
    );

  public add = async (data: CourseFormValues) =>
    await this.post(
      this.BASE_PATH,
      data,
      courseDetailedSchema,
      "Не вдалось створити курс",
    );

  public update = async (id: number, data: CourseUpdateFormValues) =>
    await this.patch(
      `${this.BASE_PATH}${id}/`,
      data,
      courseDetailedSchema,
      "Не вдалось оновити курс",
    );

  public deleteCourse = async (id: number) =>
    await this.delete(`${this.BASE_PATH}${id}/`, "Не вдалось видалити курс");

  public addTeacher = async (courseId: number, teacherId: number) =>
    await this.patch(
      `${this.BASE_PATH}${courseId}/`,
      { teacher_id: teacherId },
      courseDetailedSchema,
      "Не вдалось додати викладача до курсу",
    );

  public removeTeacher = async (courseId: number) =>
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
  ) => {
    const newPrograms = { programs: [...programs, newProgram] };

    const res = await this.patch(
      `${this.BASE_PATH}${courseId}/`,
      newPrograms,
      courseDetailedSchema,
      "Не вдалось додати нову програму до курсу",
    );

    return res;
  };

  public editProgram = async (
    courseId: number,
    programs: CourseProgram[],
    updatedProgram: CourseProgram,
  ) => {
    const updatedPrograms = {
      programs: programs.map((program: CourseProgram) =>
        program.id === updatedProgram.id ? updatedProgram : program,
      ),
    };

    const res = await this.patch(
      `${this.BASE_PATH}${courseId}/`,
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
      `${this.BASE_PATH}${courseId}/`,
      updatedPrograms,
      courseDetailedSchema,
      "Не вдалось видалити програму для курсу",
    );
  };
}

export default new ApiCourses();
