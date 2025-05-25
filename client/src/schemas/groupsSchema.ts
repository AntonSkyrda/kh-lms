import { z } from "zod";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";
import { userPlainSchema } from "./userSchemas";

export const groupPlainSchema = z.object({
  id: z.number(),
  name: z.string(),
  year_of_study: z.number().optional(),
});

export type GroupPlain = z.infer<typeof groupPlainSchema>;

export const groupsResponseSchema =
  createBaseResponseWithListSchema(groupPlainSchema);

export type GroupResponse = z.infer<typeof groupsResponseSchema>;

export const groupDetailedSchema = groupPlainSchema.extend({
  courses: z.union([
    z.array(z.object({ id: z.number(), name: z.string() })),
    z.tuple([]),
  ]),
  students: z.union([z.array(userPlainSchema), z.tuple([])]),
});

export type GroupDetailed = z.infer<typeof groupDetailedSchema>;

export const groupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Назва групи має містити щонайменше 3 символи")
    .max(30, "Назва групи не має перепищувати 30 символів"),
  year_of_study: z
    .number()
    .min(1, "Рік навчання не може бути менше 1")
    .max(6, "Рік навчання не може бути більше 6"),
});

export type GroupFormValues = z.infer<typeof groupFormSchema>;

export const groupUpdateFormSchema = groupFormSchema.partial();

export type GroupUpdateFormValues = z.infer<typeof groupUpdateFormSchema>;
