import type { Control } from "react-hook-form";
import { Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { DatePicker } from "../../../ui/DatePicker";
import SelectGroup from "./SelectGroup";
import type { GroupPlain } from "../../../schemas/groupsSchema";
import type { LessonsCreateFormValues } from "../../../schemas/lessonsSchema";
import type { CourseDetailed } from "../../../schemas/coursesSchema";
import { useState } from "react";
import { useCourses } from "../../courses/useCourses";
import CoursesSearch from "../../courses/CoursesSearch";

interface BasicParametersCardProps {
  groups: GroupPlain[];
  control: Control<LessonsCreateFormValues>;
  selectedCourse?: CourseDetailed | null;
  onCourseSelect: (courseId: number) => void;
  isLoadingCourse: boolean;
}

function BasicParametersCard({
  control,
  groups,
  selectedCourse,
  onCourseSelect,
  isLoadingCourse,
}: BasicParametersCardProps) {
  const [searchStr, setSearchStr] = useState("");
  const { courses, isLoading: isLoadingCourses } = useCourses(searchStr);

  const coursesToShow = courses.filter(
    (course) => typeof course.teacher === "number",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Основні параметри
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <FormLabel>Курс</FormLabel>
          <CoursesSearch
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            isLoading={isLoadingCourses || isLoadingCourse}
            courses={coursesToShow}
            isModal={true}
            handleSelect={onCourseSelect}
            selectedItem={selectedCourse!}
          />
          <FormDescription className="mt-2">
            Виберіть курс для створення розкладу
          </FormDescription>
        </div>

        {selectedCourse && (
          <>
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата початку курсу</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormDescription>Дата першого заняття</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата закінчення (необов'язково)</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Максимальна дата проведення занять
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Група</FormLabel>
                  <FormControl>
                    <SelectGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      groups={groups}
                      disabled={!groups.length}
                    />
                  </FormControl>
                  {!groups.length && (
                    <FormDescription className="text-destructive">
                      У цього курсу немає доданих груп
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default BasicParametersCard;
