import { z } from "zod";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";

export const userPlainSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  full_name: z.string(),
});

export type UserPlain = z.infer<typeof userPlainSchema>;

export const userSchema = userPlainSchema.omit({ full_name: true }).extend({
  first_name: z.string(),
  last_name: z.string(),
  father_name: z.string(),
  role: z.enum(["admin", "teacher", "student", "user"]),
});

export type User = z.infer<typeof userSchema>;

export const userDetailedSchema = userSchema.omit({ role: true }).extend({
  is_teacher: z.boolean(),
  is_student: z.boolean(),
});

export type UserDetailed = z.infer<typeof userDetailedSchema>;

export const userListResponseSchema =
  createBaseResponseWithListSchema(userPlainSchema);

export type UsersResponse = z.infer<typeof userListResponseSchema>;

export const baseUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Некоректний Email" })
    .min(5, { message: "Email має містити щонайменше 5 символів." }),
  password: z
    .string()
    .min(5, { message: "Пароль має містити щонайменше 5 символів." }),
  first_name: z
    .string()
    .trim()
    .min(3, { message: "Імʼя має містити щонайменше 3 символи" }),
  last_name: z
    .string()
    .trim()
    .min(3, { message: "Фамілія має містити щонайменше 3 символи" }),
  father_name: z
    .string()
    .trim()
    .min(5, { message: "По-батькові має містити щонайменше 3 символи" }),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
  role: z.string().optional(),
});

const roleRefinement = (data: { is_teacher?: boolean; is_student?: boolean }) =>
  (data.is_teacher && !data.is_student) ||
  (!data.is_teacher && data.is_student);

export const userAddFormSchema = baseUserFormSchema.refine(roleRefinement, {
  message: "Ви повинні обрати одну роль: або вчитель, або студент",
  path: ["role"],
});

export type UserAddFormValues = z.infer<typeof userAddFormSchema>;

export const userUpdateFormSchema = baseUserFormSchema
  .omit({ password: true })
  .partial()
  .refine(
    (data) => {
      if (data.is_teacher !== undefined && data.is_student !== undefined) {
        return roleRefinement(data);
      }
      return true;
    },
    {
      message: "Ви повинні обрати одну роль: або вчитель, або студент",
      path: ["role"],
    },
  );

export type UserUpdateFormValues = z.infer<typeof userUpdateFormSchema>;
