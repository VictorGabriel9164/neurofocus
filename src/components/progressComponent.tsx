import { cn } from "#/lib/utils";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUÍDA";
};

type ProgressComponentProps = {
  className?: string;
  tasks: Task[];
};

const ProgressComponent = ({
  className,
  tasks,
}: ProgressComponentProps) => {
  // total de tarefas
  const totalTasks = tasks.length;

  // concluídas
  const completedTasks = tasks.filter(
    (task) => task.state === "CONCLUÍDA"
  ).length;

  // pendentes
  const pendingTasks = tasks.filter(
    (task) => task.state === "PENDENTE"
  ).length;

  // progresso
  const progress =
    totalTasks > 0
      ? (completedTasks / totalTasks) * 100
      : 0;

  return (
    <div
      className={cn(
        "w-full bg-gray-100 rounded-3xl px-12 py-5 shadow-sm flex flex-col gap-4",
        className
      )}
    >
      <h1 className="text-4xl font-semibold text-black">
        Resumo geral
      </h1>

      {/* ALTERADO: Adicionado gap-16 para garantir um espaçamento maior entre os blocos */}
      <div className="flex items-center justify-between gap-16">
        <div className="flex flex-col gap-4">
          {/* concluídas */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
              <span className="text-green-700 text-lg">
                ✓
              </span>
            </div>

            <span className="text-2xl text-gray-800">
              {completedTasks} concluídas
            </span>
          </div>

          {/* pendentes */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
              <span className="text-yellow-700 text-lg">
                ↻
              </span>
            </div>

            <span className="text-2xl text-gray-800">
              {pendingTasks} pendentes
            </span>
          </div>
        </div>

        {/* total */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-blue-700 text-lg">
              #
            </span>
          </div>

          <span className="text-2xl text-gray-800">
            {totalTasks} tarefas
          </span>
        </div>
      </div>

      {/* barra */}
      <div className="w-full h-8 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-300 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <span className="text-lg text-gray-700 font-medium">
        {Math.round(progress)}% concluído
      </span>
    </div>
  );
};

export default ProgressComponent;