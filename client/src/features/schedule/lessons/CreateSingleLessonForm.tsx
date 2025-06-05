import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Button } from "../../../ui/button";
import {
  singleLessonFormSchema,
  type SingleLessonFormValues,
} from "../../../schemas/lessonsSchema";
import { DatePicker } from "../../../ui/DatePicker";
import SelectGroup from "./SelectGroup";
import SelectPair from "./SelectPair";
import { useCourses } from "../../courses/useCourses";
import { useCourse } from "../../courses/useCourse";
import CoursesSearch from "../../courses/CoursesSearch";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { useCreateLessons } from "./useCreateLessons";
import { PAIRS } from "../../../lib/consts";

interface CreateSingleLessonFormProps {
  handleClose: () => void;
}

function CreateSingleLessonForm({ handleClose }: CreateSingleLessonFormProps) {
  const [searchStr, setSearchStr] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<
    number | undefined
  >();

  const { courses, isLoading: isLoadingCourses } = useCourses(searchStr);
  const { course: selectedCourse, isLoading: isLoadingCourse } =
    useCourse(selectedCourseId);
  const { addLessons, isPending } = useCreateLessons();

  const form = useForm<SingleLessonFormValues>({
    resolver: zodResolver(singleLessonFormSchema),
    defaultValues: {
      group: undefined,
      program: undefined,
      date: new Date(),
      time: undefined,
    },
  });

  const coursesToShow = courses.filter(
    (course) => typeof course.teacher === "number",
  );

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourseId(courseId);
    form.resetField("group");
    form.resetField("program");
  };

  const onSubmit = (data: SingleLessonFormValues) => {
    const lesson = {
      group: data.group,
      program: data.program,
      date: format(data.date, "yyyy-MM-dd"),
      time: data.time,
    };

    addLessons([lesson]);
    handleClose();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5" />
            Створити урок
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormLabel htmlFor="select-course">Курс</FormLabel>
                <CoursesSearch
                  searchStr={searchStr}
                  setSearchStr={setSearchStr}
                  isLoading={isLoadingCourses || isLoadingCourse}
                  courses={coursesToShow}
                  isModal={true}
                  handleSelect={handleCourseSelect}
                  selectedItem={selectedCourse!}
                  id="select-course"
                />
              </div>

              {selectedCourse && (
                <>
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="select-group">Група</FormLabel>
                        <FormControl>
                          <SelectGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            groups={selectedCourse.groups}
                            disabled={!selectedCourse.groups.length}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="select-single-theme">
                          Тема
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value?.toString() || ""}
                            onValueChange={(val) => field.onChange(Number(val))}
                          >
                            <SelectTrigger id="select-single-theme">
                              <SelectValue placeholder="Оберіть тему" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedCourse.programs.map((program) => (
                                <SelectItem
                                  key={program.id}
                                  value={program.id.toString()}
                                >
                                  {program.topic} ({program.hours}г)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Дата</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            setDate={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="select-pair">Пара</FormLabel>
                        <FormControl>
                          <SelectPair
                            id="select-pair"
                            value={PAIRS.find((p) => p.start === field.value)}
                            onValueChange={(pair) =>
                              field.onChange(pair?.start)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isPending}
                >
                  Скасувати
                </Button>
                <Button type="submit" disabled={!selectedCourse || isPending}>
                  Створити урок
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateSingleLessonForm;
