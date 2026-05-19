import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button';

import TaskComponent from '#/components/createtaskButton';
import Navbar from "#/components/neuroNavbar";
export const Route = createFileRoute('/page/gerenciartarefaPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main className='flex justify-center items-center flex-col font-rubik'>
      <div className='bg-neuro-orange mt-8 w-325 h-70 rounded-2xl  flex items-start justify-start flex-col gap-3'>
        <h1 className="m-8 mb-0 text-5xl font-semibold">Minhas Tarefas:</h1>
        <h1 className="m-8 mt-2 text-2xl">Organize seus estudos e acompanhe suas atividades</h1>
        <div className='ml-14 mr-18 px-14'>
         <TaskComponent/>
         </div>
      </div>
    </main>
    </>
  )
}
