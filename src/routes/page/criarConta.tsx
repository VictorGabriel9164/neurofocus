  import { createFileRoute } from "@tanstack/react-router";
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
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
      resolver: zodResolver(createaccountSchema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      console.log("the form was submitted successfully.");
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

          <Button
            type="submit"
            variant="outline"
            className="mt-8 bg-neuro-light-purple hover:bg-neuro-purple border-none px-12 rounded-3xl mb-4 cursor-pointer"
          >
            Criar Conta
          </Button>
        </form>
      </main>
    );
  }
