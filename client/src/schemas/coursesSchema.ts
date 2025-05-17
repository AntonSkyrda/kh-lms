import { z } from "zod";
import { teacherSchema } from "./usersSchema";
import {
  groupPlainSchema,
  programPlainSchema,
} from "./plainShemas";
import { BaseResponseWithListSchema } from "./backendResponseSchema";



export const coursePlainSchema = z.object({
   name: z.string(),
   desctiption: z.string(),
})

export type CoursePlain = z.infer<typeof coursePlainSchema>

export const coursesListResponseSchema = BaseResponseWithListSchema.extend({
  results: z.array(coursePlainSchema)
})

export type CoursesListResponse = z.infer<typeof coursesListResponseSchema>

export const coursePlainPartialSchema = coursePlainSchema.partial();

export const coursesArrayShema = z.array(coursePlainSchema);

// Courses scheme from backend with get /courses
export const coursesSchema = BaseResponseWithListSchema.extend({
  items: coursesArrayShema,
});

// Course scheme from backend wit get /courses/id
export const courseDetailedSchema = coursePlainSchema.extend({
  teacher: z.union([teacherSchema, z.null()]),
  groups: z.union([z.array(groupPlainSchema), z.tuple([])]),
  programs: z.union([z.array(programPlainSchema), z.tuple([])]),
});
