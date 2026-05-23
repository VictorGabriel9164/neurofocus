import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import CreateTaskButton from "#/components/createtaskButton";
import TaskComponent from "#/components/taskComponent";
import Navbar from "#/components/neuroNavbar";

export const Route = createFileRoute("/page/gerenciartarefaPage")({
  component: RouteComponent,
});

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUIDA";
};

function RouteComponent() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca as tarefas do usuário logado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate({ to: "/page/login" });
      return;
    }

    fetch("http://localhost:3002/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("UNAUTHORIZED"); // Erro de permissão
        }
        if (!res.ok) {
          throw new Error("Erro no servidor do backend"); // Outros erros (500, etc)
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro detectado na tela de tarefas:", error);
        
        // SÓ apaga o token e desloga se o problema for a falta de autorização (401)
        if (error.message === "UNAUTHORIZED") {
          localStorage.removeItem("token");
          navigate({ to: "/page/login" });
        } else {
          // Se for outro erro (ex: backend caiu), apenas para de carregar e mantém na página
          setLoading(false);
        }
      });
  }, [navigate]);

  // Envia a nova tarefa para o backend
  const handleAddTask = async (newTaskData: Omit<Task, "id" | "state">) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3002/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTaskData),
      });

      if (response.ok) {
        const data = await response.json();
        // Adiciona a tarefa recém-criada (com o ID gerado pelo banco) no topo da lista
        setTasks((prev) => [data.task, ...prev]);
      }
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  // Marca a tarefa como concluída no backend
  const handleCompleteTask = async (taskId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3002/api/tasks/${taskId}/concluir`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ concluida: true }),
      });

      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, state: "CONCLUIDA" } : task
          )
        );
      }
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-rubik text-gray-500">
        <p>Carregando suas tarefas...</p>
      </div>
    );
  }

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex items-center flex-col font-rubik mb-20">
        <div className="bg-neuro-orange mt-8 w-325 h-70 rounded-2xl flex items-start justify-start flex-col gap-3">
          <h1 className="m-8 mb-0 text-5xl font-semibold">Minhas Tarefas:</h1>

          <h2 className="m-8 mt-2 text-2xl">
            Organize seus estudos e acompanhe suas atividades
          </h2>

          <div className="ml-14">
            <CreateTaskButton onCreateTask={handleAddTask} />
          </div>
        </div>

        <div className="w-325 flex flex-col gap-4 mt-8">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskComponent
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                time={task.time}
                state={task.state}
                onComplete={() => handleCompleteTask(task.id)}
              />
            ))
          ) : (
            <div className="w-full bg-gray-100 rounded-2xl p-6 text-center text-gray-700">
              Nenhuma atividade criada ainda.
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default RouteComponent;