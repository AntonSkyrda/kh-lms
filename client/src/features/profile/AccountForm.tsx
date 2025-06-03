import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import Spinner from "../../ui/Spinner";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "../../contexts/user/useUser";
import {
  userUpdateFormSchema,
  type UserUpdateFormValues,
} from "../../schemas/usersSchema";

function AccountForm() {
  const { user, isLoading: isLoadingUserData } = useUser();
  const { updateUser, isPending } = useUpdateUser();
  const isLoading = isLoadingUserData || isPending;

  const form = useForm<UserUpdateFormValues>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      email: user?.email,
      // password: "",
      first_name: user?.first_name,
      last_name: user?.last_name,
      father_name: user?.father_name,
      is_teacher: user?.role === "teacher",
      is_student: user?.role === "student",
    },
  });

  if (!user) return null;

  function onSubmit(data: FieldValues) {
    if (!user?.id) return;
    updateUser({ userId: user?.id, data: data as UserUpdateFormValues });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-24"
      >
        <fieldset className="space-y-8">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first_name">Імʼя</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="first_name"
                    autoComplete="first_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="last_name">Прізвище</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="last_name"
                    autoComplete="last_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="father_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="father_name">По-батькові</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="father_name"
                    autoComplete="father_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user.role === "admin" ? (
            <>
              <FormField
                name="is_student"
                render={({ field }) => (
                  <FormItem className="flex flex-row space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Студент</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="is_teacher"
                render={({ field }) => (
                  <FormItem className="flex flex-row space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Викладач</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="role"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <p>{user?.role === "student" ? "Ви студент" : "Ви викладач"}</p>
          )}
        </fieldset>
        <div>Image</div>
        <div className="flex flex-col items-center justify-center gap-5">
          <Button disabled={isLoading} size="lg" type="submit">
            <span>{isLoading ? <Spinner /> : "Внести зміни"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AccountForm;
