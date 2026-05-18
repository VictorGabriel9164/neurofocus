import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "#/schemas/zod";
import { z } from "zod";

import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import NeuroFocusIcon from "#/assets/icons/neurofocusicon.png";
import InputPassword from "#/components/inputPassword";

export const Route = createFileRoute("/page/login")({
  component: RouteComponent,
});

type FormData = z.infer<typeof loginSchema>;

function RouteComponent() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    console.log("Login realizado com sucesso.");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-rubik">
      <img
        src={NeuroFocusIcon}
        alt="neuro focus icon"
        className="w-[20rem] h-auto rounded-4xl scale-175"
      />

      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="vertical"
              data-invalid={fieldState.invalid}
              className="gap-1 mt-3"
            >
              <FieldLabel htmlFor={field.name} className="font-bold">
                E-mail
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="rounded-3xl border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green mr-32"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="vertical"
              data-invalid={fieldState.invalid}
              className="gap-1 mt-3"
            >
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="mt-8 bg-neuro-light-green hover:bg-neuro-dark-green border-none px-12 rounded-3xl mb-4 cursor-pointer"
        >
          Entrar
        </Button>
      </form>

      <h1>Não tem uma conta?</h1>

      <Link
        to="/page/criarConta"
        className="text-neuro-green underline hover:text-neuro-dark-green"
      >
        Criar Conta
      </Link>
    </main>
  );
}