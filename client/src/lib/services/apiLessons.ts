import {
  lessonSchema,
  lessonsResponseSchema,
} from "../../schemas/lessonsSchema";
import type { GeneratedLesson } from "../../types/schedule";
import ApiBase from "./apiBase";

class ApiLessons extends ApiBase {
  private readonly BASE_PATH = "/lessons/";

  public getLessons = async () =>
    await this.get(`${this.BASE_PATH}?limit=1000`, lessonsResponseSchema);

  public createLesson = async (
    lesson: Omit<GeneratedLesson, "extendedValues">,
  ) => await this.post(this.BASE_PATH, lesson, lessonSchema);
}

export default new ApiLessons();
