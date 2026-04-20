import { createFileRoute } from '@tanstack/react-router'
import { Input } from "#/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "#/components/ui/button";
import InputPassword from '#/components/inputPassword';
import NeuroFocusIcon from "#/assets/icons/neurofocusicon.png";

export const Route = createFileRoute('/page/criarConta')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <img src={NeuroFocusIcon} alt="neuro focus icon" className=" w-[20rem] h-auto rounded-4xl scale-200 border"/>
      <h1 className='text-center text-4xl font-bold mb-8'> Seja <br /> Bem-vindo {/* vai na feiura msm*/}</h1>
      <div className='flex flex-col gap-8'>
        <Field className="gap-1 mt-3">
            <FieldLabel className="font-bold">Nome Completo</FieldLabel>
            <Input className="rounded-3xl border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green mr-32"></Input>
          </Field >

        <Field className="gap-1 mt-3">
            <FieldLabel className="font-bold">Email</FieldLabel>
            <Input className="rounded-3xl border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green mr-32"></Input>
          </Field >

         
         <InputPassword className='border-neuro-light-green focus-visible:border-neuro-dark-green focus-visible:ring-neuro-dark-green'/>
      </div>
    </main>
    </>
  )
}
