import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import { createaccountSchema } from "#/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "#/components/inputPassword";
import NeuroFocusIcon from "#/assets/icons/neurofocusicon.png";

export const Route = createFileRoute("/page/criarConta")({
  component: RouteComponent,
});

type FormData = z.infer<typeof createaccountSchema>;

function RouteComponent() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(createaccountSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/api/auth/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError("root", { message: result.error || "Erro ao criar conta." });
        return;
      }

      localStorage.setItem("token", result.token);
      navigate({ to: "/page/login" });
    } catch (error) {
      console.error(error);
      setError("root", { message: "Erro ao conectar com o servidor." });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-rubik">
      <img
        src={NeuroFocusIcon}
        alt="neuro focus icon"
        className="w-[20rem] h-auto rounded-4xl scale-175"
      />

      <h1 className="text-center text-4xl font-bold mb-6">Seja Bem-vindo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="vertical"
              data-invalid={fieldState.invalid}
              className="gap-1 mt-3"
            >
              <FieldLabel htmlFor={field.name} className="font-bold">
                Nome Completo
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="rounded-3xl border-neuro-light-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple mr-32"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>
          )}
        />

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
                Email
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                className="rounded-3xl border-neuro-light-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple mr-32"
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
                className="border-neuro-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>
          )}
        />

        {errors.root && (
          <p className="text-red-500 text-sm text-center font-bold">
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className="mt-8 bg-neuro-light-purple hover:bg-neuro-purple border-none px-12 rounded-3xl mb-4 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Criando..." : "Criar Conta"}
        </Button>
      </form>
    </main>
  );
}