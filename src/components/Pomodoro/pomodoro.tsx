import { usePomodoro } from "./Context/PomodoroContext";
import PomodoroTime from "./pomodoroTime";

export default function Pomodoro() {
  const { selectedTime } = usePomodoro();
  return (
    <div className="w-150 h-100 mt-2 rounded-2xl bg-gray-200">
      {/* Header */}
      <div className="flex items-start justify-start flex-col">
        <div className="text-sm font-medium text-neuro-light-green bg-white rounded-2xl p-1 px-4 m-2">
          Foco
        </div>
      </div>

      {/* Sessão */}
      <div className="text-lg font-medium text-center">
        <h1 className="m-1">
          {selectedTime === "25" && "Sessão de 25 minutos"}
          {selectedTime === "50" && "Sessão de 50 minutos"}
          {selectedTime === "15" && "Sessão de 15 minutos"}
        </h1>
      </div>

      {/* Tempo */}
      <div className="flex flex-1 justify-center items-center flex-col">
        <PomodoroTime />
      </div>
    </div>
  );
}
