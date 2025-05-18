import { z } from "zod";

export const authResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  message: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Email не дійсний"),
  password: z.string().min(5, "Пароль має містити щонайменше 5 символів"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const logoutResponseSchema = z.object({ message: z.string() });

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
