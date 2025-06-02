import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../../../ui/form";
import { Button } from "../../../ui/button";
import { lessonCreateFormSchema } from "../../../schemas/lessonsSchema";
import BasicParametersCard from "./BasicParametersCard";
import WeeklyScheduleCard from "./WeeklySheduleCard";
import SchedulePreviewCard from "./SchedulePreviewCard";
import { useScheduleGenerator } from "./useScheduleGenerator";
import type { GeneratedLesson, WeeklyPair } from "../../../types/schedule";
import { useCreateLessons } from "./useCreateLessons";
import { useCourse } from "../../courses/useCourse";
import type { CourseDetailed } from "../../../schemas/coursesSchema";

interface CreateLessonsFormProps {
  handleClose: () => void;
}

function CreateLessonsAutoForm({ handleClose }: CreateLessonsFormProps) {
  const [weeklyPairs, setWeeklyPairs] = useState<WeeklyPair[]>([]);
  const [generatedLessons, setGeneratedLessons] = useState<GeneratedLesson[]>(
    [],
  );
  const [selectedCourseId, setSelectedCourseId] = useState<
    number | undefined
  >();

  const { addLessons, isPending } = useCreateLessons();

  const form = useForm({
    resolver: zodResolver(lessonCreateFormSchema),
    defaultValues: {
      course: undefined,
      date: undefined,
      group: undefined,
      endDate: undefined,
    },
  });

  const watchedValues = form.watch();

  const { course: selectedCourse, isLoading: isLoadingCourse } =
    useCourse(selectedCourseId);

  const { generateLessons } = useScheduleGenerator({
    course: selectedCourse as CourseDetailed,
    weeklyPairs,
    group: watchedValues.group,
  });

  useEffect(() => {
    if (selectedCourse && selectedCourseId) {
      form.setValue("course", selectedCourseId);
    }
  }, [selectedCourse, selectedCourseId, form]);

  const addWeeklyPair = useCallback(() => {
    const newPair: WeeklyPair = {
      id: Date.now().toString(),
      dayOfWeek: 1,
      dayName: "Понеділок",
      pair: {
        start: "08:30",
        end: "10:05",
        label: "1 пара",
      },
    };
    setWeeklyPairs((prev) => [...prev, newPair]);
  }, []);

  const removeWeeklyPair = useCallback((id: string) => {
    setWeeklyPairs((prev) => prev.filter((pair) => pair.id !== id));
  }, []);

  const updateWeeklyPair = useCallback(
    (id: string, updates: Partial<WeeklyPair>) => {
      setWeeklyPairs((prev) =>
        prev.map((pair) => (pair.id === id ? { ...pair, ...updates } : pair)),
      );
    },
    [],
  );

  const handleGenerateLessons = useCallback(() => {
    if (!watchedValues.date) return;

    const lessons = generateLessons(
      new Date(watchedValues.date),
      watchedValues.endDate ? new Date(watchedValues.endDate) : undefined,
    );
    setGeneratedLessons(lessons);
  }, [watchedValues.date, watchedValues.endDate, generateLessons]);

  useEffect(() => {
    if (watchedValues.date && weeklyPairs.length > 0) {
      handleGenerateLessons();
    }
  }, [
    watchedValues.date,
    watchedValues.endDate,
    weeklyPairs,
    handleGenerateLessons,
  ]);

  const onSubmit = () => {
    const lessonsToSend = generatedLessons.map((lesson) => {
      const { extendedValues: _, ...formatedLesson } = lesson;

      return formatedLesson;
    });
    addLessons(lessonsToSend);
    handleClose?.();
  };

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourseId(courseId);
    form.setValue("group", undefined);
    setGeneratedLessons([]);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <BasicParametersCard
            control={form.control}
            groups={selectedCourse?.groups || []}
            selectedCourse={selectedCourse}
            onCourseSelect={handleCourseSelect}
            isLoadingCourse={isLoadingCourse}
          />

          {selectedCourse && (
            <>
              <WeeklyScheduleCard
                weeklyPairs={weeklyPairs}
                onAddPair={addWeeklyPair}
                onRemovePair={removeWeeklyPair}
                onUpdatePair={updateWeeklyPair}
              />

              <SchedulePreviewCard generatedLessons={generatedLessons} />
            </>
          )}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateLessons}
              disabled={isPending}
            >
              Оновити розклад
            </Button>
            <Button
              type="submit"
              disabled={!generatedLessons.length || isPending}
            >
              Створити розклад
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateLessonsAutoForm;
