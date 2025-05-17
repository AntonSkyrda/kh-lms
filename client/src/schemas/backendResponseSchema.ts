import { z } from "zod";

// export const BaseResponseSchema = z.object({
//   status: z.enum(["success", "fail", "error"]),
//   message: z.string().optional(),
//   results: z.number().optional(),
//   data: z.object({}).optional(),
// });
export const BaseResponseSchema = z.any()

export type BaseResponse = z.infer<typeof BaseResponseSchema>;

export const BaseResponseWithListSchema = z.object({
  count: z.number(),
  next: z.number(),
  previous: z.number()
})

export type BaseResponseWithList = z.infer<typeof BaseResponseWithListSchema>;