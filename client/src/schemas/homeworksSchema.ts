import { z } from "zod";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";

export const homeworkPlainSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  due_date: z.string(),
  lesson: z.string(),
});

export type HomeworkPlain = z.infer<typeof homeworkPlainSchema>;

export const homeworksResponseSchema =
  createBaseResponseWithListSchema(homeworkPlainSchema);

export type HomeworksResponse = z.infer<typeof homeworksResponseSchema>;

export const homeworkDetailedSchema = homeworkPlainSchema;

export type HomeworkDetailed = z.infer<typeof homeworkDetailedSchema>;

export const createHomeworkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Назва має містити мінімум 5 символів")
    .max(100, "Назва не може перевищувати 100 символів"),
  description: z
    .string()
    .trim()
    .min(10, "Опис має містити мінімум 10 символів")
    .max(500, "Опис не може перевищувати 100 символів"),
  due_date: z.date({ required_error: "Це поле обовʼязкове!" }),
});

export type CreateHomeworkFormValues = z.infer<typeof createHomeworkFormSchema>;
