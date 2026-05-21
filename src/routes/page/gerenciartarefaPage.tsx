import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import CreateTaskButton from "#/components/createtaskButton";
import TaskComponent from "#/components/taskComponent";
import Navbar from "#/components/neuroNavbar";

export const Route = createFileRoute(
  "/page/gerenciartarefaPage"
)({
  component: RouteComponent,
});

type Task = {
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUÍDA";
};

function RouteComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex items-center flex-col font-rubik">
        <div
          className="bg-neuro-orange mt-8 w-325 h-70 rounded-2xl flex items-start justify-start flex-col gap-3"
        >
          <h1 className="m-8 mb-0 text-5xl font-semibold">
            Minhas Tarefas:
          </h1>

          <h2 className="m-8 mt-2 text-2xl">
            Organize seus estudos e acompanhe suas atividades
          </h2>

          <div className="ml-14">
            <CreateTaskButton
              onCreateTask={handleAddTask}
            />
          </div>
        </div>

        <div className="w-325 flex flex-col gap-4 mt-8">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskComponent
                key={index}
                title={task.title}
                description={task.description}
                date={task.date}
                time={task.time}
                state={task.state}
              />
            ))
          ) : (
            <div className="w-full bg-gray-100 rounded-2xl p-6 text-center text-gray-700"
            >
              Nenhuma atividade criada ainda.
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default RouteComponent;