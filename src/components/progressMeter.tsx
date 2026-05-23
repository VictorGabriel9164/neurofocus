import { cn } from "#/lib/utils";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUÍDA";
};

type ProgressMeterProps = {
  className?: string;
  tasks: Task[];
};

const ProgressMeter = ({
  className,
  tasks,
}: ProgressMeterProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.state === "CONCLUÍDA"
  ).length;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getPerformanceFeedback = (percentage: number) => {
    if (percentage === 0 && totalTasks === 0) {
      return {
        label: "Sem tarefas",
        subLabel: "Adicione tarefas para começar a pontuar!",
        colorClass: "text-gray-500 bg-gray-200",
        borderColor: "border-gray-300",
      };
    }
    if (percentage < 25) {
      return {
        label: "Você tem que melhorar",
        subLabel: "Dê o primeiro passo e conclua uma tarefa!",
        colorClass: "text-red-700 bg-red-200",
        borderColor: "border-red-300",
      };
    }
    if (percentage < 50) {
      return {
        label: "Devagar e sempre",
        subLabel: "Você está caminhando, não pare agora!",
        colorClass: "text-yellow-700 bg-yellow-200",
        borderColor: "border-yellow-300",
      };
    }
    if (percentage < 100) {
      return {
        label: "Bom desempenho!",
        subLabel: "Falta muito pouco para gabaritar o dia!",
        colorClass: "text-blue-700 bg-blue-200",
        borderColor: "border-blue-300",
      };
    }
    return {
      label: "Desempenho Excelente! 🎉",
      subLabel: "Parabéns! Você concluiu 100% das suas atividades.",
      colorClass: "text-green-700 bg-green-200",
      borderColor: "border-green-300",
    };
  };

  const feedback = getPerformanceFeedback(progress);

  return (
    <div
      className={cn(
        "w-full bg-gray-100 rounded-3xl px-12 py-5 shadow-sm flex flex-col gap-4",
        className
      )}
    >
      <h1 className="text-4xl font-semibold text-black">
        Seu Desempenho
      </h1>

      <div className="flex items-center justify-between gap-16">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className={cn("px-4 py-1.5 rounded-full font-medium text-xl", feedback.colorClass)}>
              {feedback.label}
            </div>
          </div>
          
          <span className="text-lg text-gray-600 mt-2 pl-1">
            {feedback.subLabel}
          </span>
        </div>

        <div className={cn("flex flex-col items-center justify-center border-2 p-3 rounded-2xl bg-white min-w-32", feedback.borderColor)}>
          <span className="text-3xl font-bold text-gray-800">
            {Math.round(progress)}%
          </span>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">
            Concluído
          </span>
        </div>
      </div>

      <div className="w-full h-8 bg-blue-100 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-green-300 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressMeter;