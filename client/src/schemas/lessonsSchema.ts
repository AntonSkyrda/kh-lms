import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  program: z.number(),
  program_topic: z.string(),
  group: z.number(),
  group_name: z.string(),
  course_name: z.string(),
  teacher_name: z.string(),
  date: z.string(),
  time: z.string(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonsResponseSchema = z.array(lessonSchema);

export type LessonsResponse = z.infer<typeof lessonsResponseSchema>;

export const lessonCreateFormSchema = z.object({
  group: z.number({ required_error: "Це поле обовʼязкове!" }),
  date: z.date({ required_error: "Це поле обовʼязкове!" }),
  endDate: z.date().optional(),
});

export type LessonsCreateFormValues = z.infer<typeof lessonCreateFormSchema>;
