import { createFileRoute } from "@tanstack/react-router";
import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import InputPassword from "#/components/inputPassword";
import NeuroFocusIcon from "#/assets/icons/neurofocusicon.png";

export const Route = createFileRoute("/page/criarConta")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen font-rubik">
        <img
          src={NeuroFocusIcon}
          alt="neuro focus icon"
          className=" w-[20rem] h-auto rounded-4xl scale-175"
        />
        <h1 className="text-center text-4xl font-bold mb-6">
          {" "}
          Seja Bem-vindo
        </h1>
        <div className="flex flex-col gap-8">
          <Field className="gap-1 mt-3">
            <FieldLabel className="font-bold">Nome Completo</FieldLabel>
            <Input className="rounded-3xl border-neuro-light-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple mr-32"></Input>
          </Field>

          <Field className="gap-1 mt-3">
            <FieldLabel className="font-bold">Email</FieldLabel>
            <Input className="rounded-3xl border-neuro-light-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple mr-32"></Input>
          </Field>

          <InputPassword className="border-neuro-purple focus-visible:border-neuro-dark-purple focus-visible:ring-neuro-dark-purple" />
        </div>
        <Link to="/page/login">
        <Button
          variant={"outline"}
          className="mt-8 bg-neuro-light-purple hover:bg-neuro-purple border-none px-12 rounded-3xl mb-4"
        >
          Criar Conta
        </Button>
        </Link>
      </main>
    </>
  );
}
