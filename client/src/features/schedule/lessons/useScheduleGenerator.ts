import { useCallback } from "react";
import type { CourseDetailed } from "../../../schemas/coursesSchema";
import type { GeneratedLesson, WeeklyPair } from "../../../types/schedule";
import { format } from "date-fns";

const HOURS_PER_LESSON = 2;

interface ProgramPart {
  programId: number;
  programTopic: string;
  hours: number;
  partNumber?: number;
  totalParts?: number;
}

interface UseScheduleGeneratorProps {
  course: CourseDetailed;
  weeklyPairs: WeeklyPair[];
  group: number;
}

export function useScheduleGenerator({
  course,
  weeklyPairs,
  group,
}: UseScheduleGeneratorProps) {
  const generateLessons = useCallback(
    (startDate: Date, endDate?: Date): GeneratedLesson[] => {
      if (
        !startDate ||
        !weeklyPairs.length ||
        !course ||
        !course.programs.length
      ) {
        return [];
      }

      const lessonPlan: ProgramPart[][] = [];
      let currentPairPrograms: ProgramPart[] = [];
      let currentPairHours = 0;

      for (const program of course.programs) {
        let remainingHours = program.hours;
        let partNumber = 1;
        const totalParts = Math.ceil(program.hours / HOURS_PER_LESSON);

        while (remainingHours > 0) {
          const availableHours = HOURS_PER_LESSON - currentPairHours;
          const hoursToAdd = Math.min(availableHours, remainingHours);

          if (hoursToAdd > 0) {
            const programPart: ProgramPart = {
              programId: program.id,
              programTopic: program.topic,
              hours: hoursToAdd,
            };

            if (totalParts > 1) {
              programPart.partNumber = partNumber;
              programPart.totalParts = totalParts;
            }

            currentPairPrograms.push(programPart);
            currentPairHours += hoursToAdd;
            remainingHours -= hoursToAdd;

            if (currentPairHours >= HOURS_PER_LESSON) {
              lessonPlan.push([...currentPairPrograms]);
              currentPairPrograms = [];
              currentPairHours = 0;
              partNumber++;
            }
          }
        }
      }

      if (currentPairPrograms.length > 0) {
        lessonPlan.push(currentPairPrograms);
      }

      const lessons: GeneratedLesson[] = [];
      const sortedWeeklyPairs = [...weeklyPairs].sort(
        (a, b) => a.dayOfWeek - b.dayOfWeek,
      );

      const currentDate = new Date(startDate);
      let lessonPlanIndex = 0;

      while (
        lessonPlanIndex < lessonPlan.length &&
        (!endDate || currentDate <= endDate)
      ) {
        for (const weeklyPair of sortedWeeklyPairs) {
          if (lessonPlanIndex >= lessonPlan.length) break;

          const daysToAdd =
            (weeklyPair.dayOfWeek - currentDate.getDay() + 7) % 7;
          const lessonDate = new Date(currentDate);
          lessonDate.setDate(currentDate.getDate() + daysToAdd);

          if (endDate && lessonDate > endDate) continue;

          const pairPrograms = lessonPlan[lessonPlanIndex];

          for (const programPart of pairPrograms) {
            let topic = programPart.programTopic;

            if (programPart.partNumber && programPart.totalParts) {
              topic += ` (частина ${programPart.partNumber}/${programPart.totalParts})`;
            }

            lessons.push({
              group,
              program: programPart.programId,
              date: format(lessonDate, "yyyy-MM-dd"),
              time: weeklyPair.pair.start,
              extendedValues: {
                pair: weeklyPair.pair,
                programTopic: topic,
                hours: programPart.hours,
              },
            });
          }

          lessonPlanIndex++;
        }

        currentDate.setDate(currentDate.getDate() + 7);
      }

      return lessons;
    },
    [course, weeklyPairs, group],
  );

  return { generateLessons };
}
