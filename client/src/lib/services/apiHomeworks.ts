import {
  homeworkDetailedSchema,
  homeworksResponseSchema,
  type CreateHomeworkFormValues,
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
}

export default new ApiHomeworks();
