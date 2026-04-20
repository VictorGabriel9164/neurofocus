import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { ClipboardList } from "lucide-react";
import Navbar from "#/components/neuroNavbar";
import CloudImg from "#/assets/icons/cloudimg.png";

export const Route = createFileRoute("/page/home")({ component: App });

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex justify-center items-center flex-col font-rubik">
        <div className="bg-neuro-light-blue mt-8 w-325 h-70 rounded-2xl  flex items-start justify-start flex-col gap-3">
          <div className="absolute right-23 top-6 scale-90">
            <img src={CloudImg} alt="imagem da nuvem" />
          </div>
          <h1 className="m-8 mb-0 text-5xl font-semibold">Olá!</h1>
          <h1 className="m-8 mt-2 text-2xl">Suas tarefas estão aqui:</h1>
          <Button
            variant={"outline"}
            className="ml-14 mr-18 bg-neuro-light-green hover:bg-neuro-dark-green border-none px-14 rounded-3xl text-white"
          >
            Adicionar Tarefa
          </Button>
        </div>

        <div className="flex items-center justify-between mt-16">
          {/*gerenciar tarefas*/}
          <div className="bg-neuro-light-green w-45 h-55 rounded-2xl flex items-center flex-col">
            <ClipboardList className="scale-250 m-8" />
            <h1 className="font-bold text-[16px]">Gerencie Tarefas</h1>
            <div className="w-4 h-1.5 bg-gray-300 px-20 rounded-4xl mb-2"></div>
            <h1 className="text-center text-xs">Organize suas atividades escolares </h1>
            <Button variant={"outline"} className=" mt-2 bg-neuro-dark-green border-none px-4 rounded-3xl text-white">Ver Tarefas</Button>
          </div>
        </div>
      </main>
    </>
  );
}
