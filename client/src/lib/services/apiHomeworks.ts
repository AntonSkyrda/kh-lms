import {
  homeworkDetailedSchema,
  homeworksResponseSchema,
  homeworkSubmitStatusByStudentResponseSchema,
  type CreateHomeworkFormValues,
  homeworkSubmissionsSchema,
  homeworkSubmitStatusSchema,
} from "../../schemas/homeworksSchema";
import type { GetListParams } from "../../types/paramsTypes";
import { ITEMS_PER_PAGE } from "../consts";
import ApiBase from "./apiBase";

class ApiHomeworks extends ApiBase {
  private readonly BASE_PATH = "/homeworks/";

  public getHomeworks = async ({
    limit = ITEMS_PER_PAGE,
    page = 0,
    search = "",
  }: GetListParams) =>
    await this.get(
      `${this.BASE_PATH}?limit=${limit}&offset=${page * limit}&search=${search}`,
      homeworksResponseSchema,
      "Не вдалось отримати завдання",
    );

  public getHomework = async (id: number) =>
    await this.get(
      `${this.BASE_PATH}${id}`,
      homeworkDetailedSchema,
      "Не вдалось отримати завдання",
    );

  public add = async (lessonId: number, data: CreateHomeworkFormValues) =>
    await this.post(
      this.BASE_PATH,
      { lesson_id: lessonId, ...data },
      homeworkDetailedSchema,
      "Не вдалось створити завдання",
    );

  public getSubmitStatusByStudent = async (homeworkId: number) =>
    await this.get(
      `${this.BASE_PATH}${homeworkId}/submit/`,
      homeworkSubmitStatusByStudentResponseSchema,
      "Не вдалось отримати статус виконання домашнього завдання.",
    );

  public submitHomework = async (homeworkId: number, answer: string) =>
    await this.post(
      `${this.BASE_PATH}${homeworkId}/submit/`,
      { answer },
      homeworkSubmitStatusSchema,
      "Не вдалось надати відповідь на домашнє завдання.",
    );

  public getSubmission = async (homeworkId: number) =>
    await this.get(
      `${this.BASE_PATH}${homeworkId}/submissions/`,
      homeworkSubmissionsSchema,
      "Не вдалось отримати статуси домашнього завдання.",
    );

  public giveGrade = async (
    submissionId: number,
    grade: number,
    feedback: string,
  ) => {
    return await this.patch(
      `${this.BASE_PATH}submissions/${submissionId}/grade/`,
      { grade, feedback },
      homeworkSubmitStatusSchema,
      "Не вдалось поставити оцінку домашнього завданню студента.",
    );
  };
}

export default new ApiHomeworks();
