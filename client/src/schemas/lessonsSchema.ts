import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  program: z.number(),
  program_topic: z.string(),
  group: z.number(),
  group_name: z.string(),
  course_name: z.string(),
  teacher_name: z.string().nullable(),
  date: z.string(),
  time: z.string(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonsResponseSchema = z.array(lessonSchema);

export type LessonsResponse = z.infer<typeof lessonsResponseSchema>;

export const lessonsCreateFormSchema = z.object({
  group: z.number({ required_error: "Це поле обовʼязкове!" }),
  course: z.number({ required_error: "Це поле обовʼязкове!" }),
  date: z.date({ required_error: "Це поле обовʼязкове!" }),
  endDate: z.date().optional(),
});

export type LessonsCreateFormValues = z.infer<typeof lessonsCreateFormSchema>;

export const singleLessonFormSchema = z.object({
  group: z.number({ required_error: "Це поле обовʼязкове!" }),
  program: z.number({ required_error: "Це поле обовʼязкове!" }),
  date: z.date({ required_error: "Це поле обовʼязкове!" }),
  time: z.string({ required_error: "Це поле обовʼязкове!" }),
});

export type SingleLessonFormValues = z.infer<typeof singleLessonFormSchema>;
