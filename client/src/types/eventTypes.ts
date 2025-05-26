import type { Lesson } from "../schemas/lessonsSchema";

export interface CustomExtendedProps {
  lesson: Lesson;
  pairLabel: string;
  course: string;
  teacher: string;
  group: string;
}

export interface SlotLabelInfo {
  date: Date;
  text: string;
  view: {
    type: string;
  };
}
