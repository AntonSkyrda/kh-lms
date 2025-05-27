import { z } from "zod";
import { createBaseResponseWithListSchema } from "./backendResponseSchema";

export const lessonSchema = z.object({
  id: z.number(),
  program: z.number(),
  program_topic: z.string(),
  duration: z.number(),
  group: z.number(),
  group_name: z.string(),
  course_name: z.string(),
  teacher_name: z.string(),
  date: z.string(),
  time: z.string(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonsResponseSchema =
  createBaseResponseWithListSchema(lessonSchema);

export type LessonsResponse = z.infer<typeof lessonsResponseSchema>;

export const lessonCreateFormSchema = z.object({
  // program: z.number({ message: "Це поле обовʼязкове!" }),
  group: z.number({ message: "Це поле обовʼязкове!" }),
  date: z.string({ message: "Це поле обовʼязкове!" }),
  time: z.string({ message: "Це поле обовʼязкове!" }),
});

export type LessonCreateFormValues = z.infer<typeof lessonCreateFormSchema>;
