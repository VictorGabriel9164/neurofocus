import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import Navbar from "#/components/neuroNavbar";
export const Route = createFileRoute("/page/home")({ component: App });

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex justify-center items-center font-rubik">
        <div className="bg-neuro-light-blue mt-8 w-[1300px] h-[300px] rounded-2xl  flex items-start justify-start flex-col gap-3">
          <h1 className="m-8 mb-0 text-5xl font-semibold">Olá!</h1>
          <h1 className="m-8 mt-0 text-2xl">Suas tarefas estão aqui:</h1>
          <Button variant={"outline"} className=" m-12 mr-18 bg-neuro-light-green hover:bg-neuro-dark-green border-none px-14 rounded-3xl text-white">Adicionar Tarefa</Button>
        </div>
      </main>
    </>
  );
}
