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

interface BasicParametersCardProps {
  groups: GroupPlain[];
  control: Control<LessonsCreateFormValues>;
}

function BasicParametersCard({ control, groups }: BasicParametersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Основні параметри
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default BasicParametersCard;
