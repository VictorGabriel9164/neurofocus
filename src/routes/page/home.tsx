import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { ClipboardList, TrendingUp } from "lucide-react"; 
import { Link } from "@tanstack/react-router";
import pomodoroTimer from "#/assets/icons/pomodorotimer.png";
import SubpageComponent from "#/components/subpageHomecomponent";
import Navbar from "#/components/neuroNavbar";
import CloudImg from "#/assets/icons/cloudimg.png";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/page/home")({ component: App });

type Task = {
  id: number;
  title: string;
  description: string;
  state: string;
};

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Caixinhas de memória para as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskError, setTaskError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate({ to: "/page/login" });
      return;
    }

    // 1. Busca os dados do usuário
    fetch("http://localhost:3002/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setUserName(data.user.name);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate({ to: "/page/login" });
      });

    // 2. Busca as tarefas
    fetch("http://localhost:3002/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tasks) {
          setTasks(data.tasks);
        } else {
          setTaskError(data.error || "Erro ao carregar tarefas.");
        }
      })
      .catch(() => {
        setTaskError("Não foi possível conectar ao servidor.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-rubik font-bold">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      {/* O seu main exato e inalterado */}
      <main className="flex justify-center items-center flex-col font-rubik">
        <div className="bg-neuro-light-blue mt-8 w-325 h-70 rounded-2xl flex items-start justify-start flex-col gap-3 relative">
          <div className="absolute right-6 scale-90 z-10 -bottom-12">
            <img src={CloudImg} alt="imagem da nuvem" className="pointer-events-none"/>
          </div>
          <h1 className="m-8 mb-0 text-5xl font-semibold">Olá, {userName}!</h1>
          <h1 className="m-8 mt-2 text-2xl">Suas tarefas estão aqui:</h1>
          <Link to="/page/gerenciartarefaPage">
            <Button variant={"outline"}
              className="ml-14 mr-18 bg-neuro-light-green hover:bg-neuro-dark-green border-none px-14 rounded-3xl text-white">
              Adicionar Tarefa
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mt-16 gap-16">
          <SubpageComponent
            title="Gerencie Tarefas"
            icon={<ClipboardList />}
            subtitle="Organize suas atividades escolares"
            to="/page/gerenciartarefaPage"
            buttontitle="Ver Tarefas >"
            className="bg-neuro-light-green"
            buttonClassName="bg-neuro-dark-green"
          />

          <SubpageComponent
            title="Progresso"
            icon={<TrendingUp />}
            subtitle="Veja aqui seu desempenho semanal"
            to="/page/progressPage"
            buttontitle="Ver Progresso >"
            className="bg-neuro-light-purple"
            buttonClassName="bg-neuro-dark-purple"
          />

          <SubpageComponent
            title="Pomodoro"
            src={pomodoroTimer}
            alt="pomodoro icon"
            subtitle="Com essa técnica estude melhor"
            to="/page/pomodoroPage"
            buttontitle="Focar Agora >"
            className="bg-neuro-light-red"
            buttonClassName="bg-neuro-dark-red"
          />
        </div>

        <div className="mt-14 font-bold flex-col text-4xl w-250">
          Minhas tarefas:
          <div className="h-1 rounded-4xl bg-black grow-0 mt-2"></div>
        </div>

        <div className="w-250 mt-8 mb-16 flex flex-col gap-4">
          {taskError && (
            <p className="text-red-500 font-medium">{taskError}</p>
          )}

          {tasks.length === 0 && !taskError ? (
            <p className="text-gray-500 text-xl mt-4">
              Você ainda não tem nenhuma tarefa pendente.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="border-2 border-neuro-light-green p-5 rounded-2xl bg-white shadow-sm px-8">
                  <h2 className="text-2xl font-bold text-gray-800 break-words">{task.title}</h2>
                  
                  {task.description && (
                    <p className="text-gray-600 mt-2 text-md break-words">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="mt-4 inline-block">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      task.state === 'CONCLUIDA' 
                        ? 'bg-neuro-dark-green text-white' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {task.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}