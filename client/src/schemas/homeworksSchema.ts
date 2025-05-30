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
