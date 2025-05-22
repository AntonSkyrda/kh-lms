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

export const userListResponseSchema =
  createBaseResponseWithListSchema(userPlainSchema);

export type UsersResponse = z.infer<typeof userListResponseSchema>;
