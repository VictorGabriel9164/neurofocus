import { cn } from "#/lib/utils";
import ConfirmDialogComp from "#/components/confirmdialogComponent";
type TaskComponentProps = {
  className?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  state: "PENDENTE" | "CONCLUÍDA";
  onComplete: () => void;
};

const TaskComponent = ({
  className,
  title,
  description,
  date,
  time,
  state,
  onComplete,
}: TaskComponentProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl p-6 shadow-md flex flex-col gap-4 border",
        state === "CONCLUÍDA"
          ? "bg-green-100 border-green-300"
          : "bg-yellow-100 border-yellow-300",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <p className="text-gray-700">{description}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span
            className={cn(
              "px-4 py-1 rounded-full text-sm font-medium",
              state === "CONCLUÍDA"
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white",
            )}
          >
            {state}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex gap-6">
          <span>📅 {date}</span>
          <span>⏰ {time}</span>
        </div>

        {state === "PENDENTE" && (
          <ConfirmDialogComp onConfirm={onComplete}/>
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
