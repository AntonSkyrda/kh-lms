import { ZodSchema } from "zod";
import ApiBase from "./apiBase";
import { authResponseSchema, type AuthResponse, type LoginFormValues } from "../../schemas/authSchema";

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
      `${this.BASE_PATH}/login`,
      credentials,
      authResponseSchema as ZodSchema,
      "Не вдалося авторизуватися"
    );

    return res;
  }

  // public async logout() {
  //   return this.post<LogoutResponse, Record<string, never>>(
  //     `${this.BASE_PATH}/logout`,
  //     {},
  //     LogoutResponseSchema,
  //     "Не вдалося вийти з системи"
  //   );
  // }
}

export default new ApiAuth();
