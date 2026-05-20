import { cn } from "#/lib/utils";

type TaskComponentProps = {
  className?: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

const TaskComponent = ({
  className,
  title,
  description,
  date,
  time,
}: TaskComponentProps) => {
  return (
    <div
      className={cn(
        `w-full bg-white rounded-2x p-6 shadow-md flex flex-col gap-4 border border-gray-200`,className
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>

        <p className="text-gray-600">
          {description}
        </p>
      </div>

      <div className="flex gap-6 text-sm text-gray-500">
        <span>
          📅 {date}
        </span>

        <span>
          ⏰ {time}
        </span>
      </div>
    </div>
  );
};

export default TaskComponent;