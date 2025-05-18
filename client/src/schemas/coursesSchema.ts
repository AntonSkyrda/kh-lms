import { z } from "zod";
import { teacherSchema } from "./usersSchema";
import { groupPlainSchema, programPlainSchema } from "./plainShemas";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";

export const coursePlainSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
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
    .max(90, "Курс має містити не більше ніж 90 символів у назві"),
  description: z
    .string()
    .trim()
    .min(5, "Курс має містити щонайменше 5 символів у описі")
    .max(250, "Курс має містити не більше ніж 250 символів у описі"),
});

export type CourseCreateFormValues = z.infer<typeof courseCreateFormSchema>;

export const courseDetailedSchema = coursePlainSchema.extend({
  teacher: z.union([teacherSchema, z.null()]),
  groups: z.union([z.array(groupPlainSchema), z.tuple([])]),
  programs: z.union([z.array(programPlainSchema), z.tuple([])]),
});

export const courseUpdateFormSchema = courseCreateFormSchema.partial();

export type CourseUpdateFormValues = z.infer<typeof courseUpdateFormSchema>;

export type CourseDetailed = z.infer<typeof courseDetailedSchema>;

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
