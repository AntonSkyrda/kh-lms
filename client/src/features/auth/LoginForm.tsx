import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormValues } from "../../schemas/authSchema";
import { useLogin } from "./useLogin";

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "password",
    },
  });

  const { login, isPending, error } = useLogin();

  function onSubmit(data: FieldValues) {
    const { email, password } = data;
    console.log(email, password)
    login(email, password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  autoComplete="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-center gap-5">
          <Button disabled={isPending} size="lg" type="submit">
            {isPending ? "Вхід..." : "Увійти"}
          </Button>
          {error && <p className="text-destructive">{error.message}</p>}
        </div>
      </form>
    </Form>
  );
}
