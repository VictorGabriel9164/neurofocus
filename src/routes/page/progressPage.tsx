import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import ProgressMeter from "#/components/progressMeter";
import ProgressComponent from "#/components/progressComponent";
import Navbar from "#/components/neuroNavbar";

export const Route = createFileRoute(
  "/page/progressPage"
)({
  component: RouteComponent,
});

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUÍDA";
};

function RouteComponent() {
  const [tasks] = useState<Task[]>([]);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex items-center flex-col font-rubik">
        <div className="bg-gray-300 mt-8 w-325 h-70 rounded-2xl flex items-start justify-start flex-col gap-3">
          <h1 className="m-8 mb-0 text-4xl font-semibold">
            Seu Progresso
          </h1>

          <h2 className="m-8 mt-2 text-2xl">
            Acompanhe seu desempenho nos estudos
          </h2>

          <Link to="/page/gerenciartarefaPage">
            <Button
              variant={"outline"}
              className="ml-14 mr-18 bg-neuro-light-green hover:bg-neuro-dark-green border-none px-14 rounded-3xl text-white cursor-pointer"
            >
              VER SUAS TAREFAS
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex gap-8">
          <ProgressComponent tasks={tasks} />
          <ProgressMeter tasks={tasks} />
        </div>
      </main>
    </>
  );
}

export default RouteComponent;