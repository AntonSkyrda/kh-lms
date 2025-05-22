import { z } from "zod";

export const BaseResponseSchema = z.any();

export type BaseResponse = z.infer<typeof BaseResponseSchema>;

export const createBaseResponseWithListSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });

export type BaseResponseWithList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
