import {
  groupDetailedSchema,
  groupPlainSchema,
  groupsResponseSchema,
  type GroupFormValues,
  type GroupUpdateFormValues,
} from "../../schemas/groupsSchema";
import type { UserPlain } from "../../schemas/usersSchema";
import type { GetListParams } from "../../types/paramsTypes";
import { ITEMS_PER_PAGE } from "../consts";
import ApiBase from "./apiBase";

class ApiGroups extends ApiBase {
  private readonly BASE_PATH = "/groups/";

  public getGroups = async ({
    limit = ITEMS_PER_PAGE,
    page = 0,
    search = "",
  }: GetListParams) =>
    await this.get(
      `${this.BASE_PATH}?limit=${limit}&offset=${limit * page}&search=${search}`,
      groupsResponseSchema,
      "Сталася помилка при отриманні груп",
    );

  public getGroup = async (id: number) =>
    await this.get(
      `${this.BASE_PATH}${id}/`,
      groupDetailedSchema,
      "Не вдалось отримати групу",
    );

  public add = async (data: GroupFormValues) =>
    await this.post(
      this.BASE_PATH,
      data,
      groupPlainSchema,
      "Не вдалось створити групу",
    );

  public update = async (id: number, data: GroupUpdateFormValues) =>
    await this.patch(
      `${this.BASE_PATH}${id}/`,
      data,
      groupDetailedSchema,
      "Не вдалось оновити групу",
    );

  public deleteGroup = async (id: number) =>
    await this.delete(`${this.BASE_PATH}${id}/`, "Не вдалось видалити групу");

  public addStudent = async (
    groupId: number,
    students: UserPlain[],
    newStudentId: number,
  ) => {
    const newStudents = [
      ...students.map((student) => student.id),
      newStudentId,
    ];

    return await this.patch(
      `${this.BASE_PATH}${groupId}/`,
      { student_ids: newStudents },
      groupDetailedSchema,
      "Не вдалось додати нового студента до групи",
    );
  };

  public removeStudent = async (
    groupId: number,
    students: UserPlain[],
    studentToRemoveId: number,
  ) => {
    const updatedStudents = students
      .map((student) => student.id)
      .filter((id) => id !== studentToRemoveId);

    return await this.patch(
      `${this.BASE_PATH}${groupId}/`,
      { student_ids: updatedStudents },
      groupDetailedSchema,
      "Не вдалось видалити студента з групи",
    );
  };
}

export default new ApiGroups();
