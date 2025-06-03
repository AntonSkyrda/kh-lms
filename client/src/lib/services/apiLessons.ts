import {
  lessonSchema,
  lessonsResponseSchema,
} from "../../schemas/lessonsSchema";
import type { GeneratedLesson } from "../../types/schedule";
import ApiBase from "./apiBase";

class ApiLessons extends ApiBase {
  private readonly BASE_PATH = "/lessons/";

  public getLessons = async (
    dateFrom: string,
    dateTo: string,
    filterByCourseId: number | string = "",
    filterByGroupId: number | string = "",
  ) =>
    await this.get(
      `${this.BASE_PATH}?date_from=${dateFrom}&date_to=${dateTo}&course_id=${filterByCourseId}&group_id=${filterByGroupId}`,
      lessonsResponseSchema,
    );

  public getLesson = async (id: number) =>
    await this.get(`${this.BASE_PATH}${id}`, lessonSchema);

  public createLesson = async (
    lesson: Omit<GeneratedLesson, "extendedValues">,
  ) => await this.post(this.BASE_PATH, lesson, lessonSchema);
}

export default new ApiLessons();
