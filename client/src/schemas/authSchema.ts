import { z } from "zod";

export const authResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>

export const loginFormSchema = z.object({
  email: z.string().email("Email не дійсний"),
  password: z.string().min(5, "Пароль має містити щонайменше 5 символів")
})

export type LoginFormValues = z.infer<typeof loginFormSchema>