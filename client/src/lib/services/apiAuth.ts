import { z, ZodSchema } from "zod";
import ApiBase from "./apiBase";
import {
  authResponseSchema,
  type AuthResponse,
  type LoginFormValues,
} from "../../schemas/authSchema";

class ApiAuth extends ApiBase {
  private readonly BASE_PATH = "/auth";

  // public signup = async (userData: CreateUserInput) => {
  //   const res = await this.post(
  //     `${this.BASE_PATH}/signup`,
  //     userData,
  //     AuthResponseSchema,
  //     "Не вдалося зареєструвати користувача"
  //   );
  //   return res;
  // };

  public async login(credentials: LoginFormValues) {
    const res = await this.post<AuthResponse, LoginFormValues>(
      `${this.BASE_PATH}/login/`,
      credentials,
      authResponseSchema as ZodSchema,
      "Не правильний email чи пароль",
    );

    return res;
  }

  public async logout(): Promise<{ message: string }> {
    const logoutResponseSchema = z.object({ message: z.string() });

    return this.get<{ message: string }>(
      `${this.BASE_PATH}/logout/`,
      logoutResponseSchema,
      "Не вдалося вийти з системи",
    );
  }
}

export default new ApiAuth();
