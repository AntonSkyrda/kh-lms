import { lessonsResponseSchema } from "../../schemas/lessonsSchema";
import ApiBase from "./apiBase";

class ApiLessons extends ApiBase {
  private readonly BASE_PATH = "/lessons/";

  public getLessons = async () =>
    await this.get(this.BASE_PATH, lessonsResponseSchema);
}

export default new ApiLessons();
