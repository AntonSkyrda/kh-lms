import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  father_name: z.string(),
  role: z.enum(['admin', 'teacher', 'student'])
})

export type User = z.infer<typeof userSchema>