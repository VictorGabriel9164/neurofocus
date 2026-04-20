import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { ClipboardList } from "lucide-react";
import { TrendingUp } from 'lucide-react'; 
import pomodoroTimer from "#/assets/icons/pomodorotimer.png";
import SubpageComponent from "#/components/subpageHomecomponent";
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

        <div className="flex items-center justify-between mt-16 gap-16">
          {/*gerenciar tarefas*/}
          <SubpageComponent
            title="Gerencie Tarefas"
            icon={<ClipboardList />}
            subtitle="Organize suas atividades escolares"
            to=""
            buttontitle="Ver Tarefas >"
            className="bg-neuro-light-green"
            buttonClassName="bg-neuro-dark-green"
          />

          {/*progresso*/}
          <SubpageComponent
            title="Progresso"
            icon={<TrendingUp />}
            subtitle="Veja aqui seu desempenho semanal"
            to=""
            buttontitle="Ver Progresso >"
            className="bg-neuro-light-purple"
            buttonClassName="bg-neuro-dark-purple"
          />

          {/*pomodoro*/}
          <SubpageComponent
            title="Pomodoro"
            src={pomodoroTimer}
            alt="pomodoro icon"
            subtitle="Com essa técnica estude melhor"
            to=""
            buttontitle="Focar Agora >"
            className="bg-neuro-light-red"
            buttonClassName="bg-neuro-dark-red"
          />
        </div>
      </main>
    </>
  );
}
