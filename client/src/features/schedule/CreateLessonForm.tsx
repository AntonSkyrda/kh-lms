import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonCreateFormSchema } from "../../schemas/lessonsSchema";
import type { CourseDetailed } from "../../schemas/coursesSchema";
import { useGroups } from "../groups/useGroups";
import { useState } from "react";
import GroupsSearch from "../groups/GroupsSearch";
import type { GroupPlain } from "../../schemas/groupsSchema";
import { Badge } from "../../ui/badge";
import { X } from "lucide-react";

interface CreateLessonsFormProps {
  course: CourseDetailed;
}

function CreateLessonsForm({ course }: CreateLessonsFormProps) {
  const [searchStr, setSearchStr] = useState("");

  const { groups, isLoading } = useGroups(searchStr);
  const [selectedGroup, setSelectedGroup] = useState<GroupPlain | undefined>(
    undefined,
  );
  const form = useForm({
    resolver: zodResolver(lessonCreateFormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-10">
        <fieldset className="flex flex-col gap-5">
          <FormField
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Дата початку курсу</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    id="date"
                    // disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedGroup ? (
            <Badge variant="outline">
              {selectedGroup.name}
              <span onClick={() => setSelectedGroup(undefined)}>
                <X />
              </span>
            </Badge>
          ) : (
            <GroupsSearch
              searchStr={searchStr}
              setSearchStr={setSearchStr}
              isLoading={isLoading}
              isModal={false}
              handleSelect={(id: number) =>
                setSelectedGroup(groups.find((group) => id === group.id))
              }
              groups={groups}
            />
          )}
        </fieldset>

        <FormField
          name="pair"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="time">Пара</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  id="time"
                  // disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CreateLessonsForm;
