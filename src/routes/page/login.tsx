import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute("/page/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="flex flex-col gap-8">
          <Field className="gap-1 mt-3">
          <FieldLabel className="font-bold">E-mail</FieldLabel>
          <Input className="rounded-3xl border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green mr-32"></Input>
          </Field>

          <Field className="gap-1 mt-3">
            <FieldLabel className="font-bold">Senha</FieldLabel>
          <Input className="rounded-3xl border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green mr-32"></Input>
          </Field>
        </div>
        <Button variant={"outline"} className="mt-14 bg-neuro-dark-green border-none px-12 rounded-3xl">Entrar</Button>
        <h1>Não tem uma conta?</h1>
      </main>
    </>
  );
}
