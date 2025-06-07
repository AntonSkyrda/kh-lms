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

export const homeworkSubmitStatusByStudentSchema = z.object({
  id: z.number(),
  homework: z.string(),
  student_id: z.number(),
  student: z.string(),
  answer: z.string(),
  submission_at: z.string(),
  grade: z.number().min(1).nullable(),
  feedback: z.string(),
});

export type HomeworkSubmitStatusByStudent = z.infer<
  typeof homeworkSubmitStatusByStudentSchema
>;

export const homeworkSubmitStatusByStudentResponseSchema =
  homeworkSubmitStatusByStudentSchema.optional();

export type HomeworkSubmitStatusByStudentResponse = z.infer<
  typeof homeworkSubmitStatusByStudentResponseSchema
>;

export const submitHomeworkFormForStudentSchema = z.object({
  answer: z
    .string()
    .trim()
    .min(1, "Ви мусите дати відповідь")
    .max(500, "Відповідь не мусить перевищути 500 символів."),
});

export type SubmitFormForStudentValues = z.infer<
  typeof submitHomeworkFormForStudentSchema
>;
