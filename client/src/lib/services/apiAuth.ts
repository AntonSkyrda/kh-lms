import { ZodSchema } from "zod";
import ApiBase from "./apiBase";
import {
  authResponseSchema,
  logoutResponseSchema,
  type AuthResponse,
  type LoginFormValues,
  type LogoutResponse,
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

  public login = async (credentials: LoginFormValues): Promise<AuthResponse> =>
    await this.post<AuthResponse, LoginFormValues>(
      `${this.BASE_PATH}/login/`,
      credentials,
      authResponseSchema as ZodSchema,
      "Не правильний email чи пароль",
    );

  public logout = async (): Promise<null> => {
    await this.post<LogoutResponse, null>(
      `${this.BASE_PATH}/logout/`,
      null,
      logoutResponseSchema as ZodSchema,
      "Не вдалося вийти з системи",
    );

    return null;
  };
}

export default new ApiAuth();
