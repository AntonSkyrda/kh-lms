import { z } from "zod";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";
import { userPlainSchema } from "./userSchemas";

export const coursePlainSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  teacher: z.union([z.number(), z.null()]),
});

export type CoursePlain = z.infer<typeof coursePlainSchema>;

export const coursesListResponseSchema =
  createBaseResponseWithListSchema(coursePlainSchema);

export type CoursesListResponse = z.infer<typeof coursesListResponseSchema>;

export const courseCreateFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Курс має містити щонайменше 5 символів у назві")
    .max(55, "Курс має містити не більше ніж 90 символів у назві"),
  description: z
    .string()
    .trim()
    .min(5, "Курс має містити щонайменше 5 символів у описі")
    .max(250, "Курс має містити не більше ніж 250 символів у описі"),
});

export type CourseCreateFormValues = z.infer<typeof courseCreateFormSchema>;

export const courseProgramSchema = z.object({
  id: z.number().min(1, "ID програми не дійсний"),
  topic: z
    .string()
    .trim()
    .min(5, "Тема має містити щонайменше 5 символів")
    .max(80, "Тема не має перевищувати 80 символів"),
  hours: z
    .number()
    .min(0.5, "Тема не може тривати менше пігодини")
    .max(50, "Тема не може тривати більше 50 годин"),
});

export type CourseProgram = z.infer<typeof courseProgramSchema>;

export const courseProgramFormSchema = courseProgramSchema.omit({
  id: true,
});

export type CourseProgramFormValues = z.infer<typeof courseProgramFormSchema>;

// export const courseProgramUpdateFormSchema = courseProgramSchema
//   .omit({ id: true })
//   .partial();

// export type CourseProgramUpdateFormValues = z.infer<
//   typeof courseProgramUpdateFormSchema
// >;

export const courseDetailedSchema = coursePlainSchema.extend({
  teacher: z.union([userPlainSchema, z.null()]),
  groups: z.union([z.array(z.number()), z.tuple([])]),
  programs: z.union([z.array(courseProgramSchema), z.tuple([])]),
});

export type CourseDetailed = z.infer<typeof courseDetailedSchema>;

export const courseUpdateFormSchema = courseCreateFormSchema.partial();

export type CourseUpdateFormValues = z.infer<typeof courseUpdateFormSchema>;

export const coursePlainPartialSchema = coursePlainSchema.partial();

export const coursesArrayShema = z.array(coursePlainSchema);

// Courses scheme from backend with get /courses
// export const coursesSchema = BaseResponseWithListSchema.extend({
//   items: coursesArrayShema,
// });

// // Course scheme from backend wit get /courses/id
// export const courseDetailedSchema = coursePlainSchema.extend({
//   teacher: z.union([teacherSchema, z.null()]),
//   groups: z.union([z.array(groupPlainSchema), z.tuple([])]),
//   programs: z.union([z.array(programPlainSchema), z.tuple([])]),
// });
