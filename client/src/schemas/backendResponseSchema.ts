import { z } from "zod";

export const BaseResponseSchema = z.any();

export type BaseResponse = z.infer<typeof BaseResponseSchema>;

export const createBaseResponseWithListSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    count: z.number(),
    next: z.number().nullable(),
    previous: z.number().nullable(),
    results: z.array(itemSchema),
  });

export type BaseResponseWithList<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
};
