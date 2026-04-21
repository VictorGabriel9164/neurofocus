import { usePomodoro } from "./Context/PomodoroContext";
import { Clock } from "lucide-react";
import { RefreshCcwDot } from "lucide-react";
export default function PomodoroCycle() {
  const { cycles, formatTotalTime } = usePomodoro();

  return (
    <>
      <div className="w-156 h-46 bg-gray-200 rounded-2xl">
        <h1 className="font-bold text-center pt-3">Resumo de Hoje:</h1>
        {/** tempo total */}
        <div className="flex justify-center items-center gap-26 mt-12">
          <div className="w-38 h-16 bg-gray-50 rounded-2xl flex justify-center items-center gap-2 ">
            <div className="bg-neuro-light-green p-1 px-2 rounded-xl">
              <Clock />
            </div>
            <div className="flex-col">
              {formatTotalTime()}
              <h1 className="text-xs">Tempo Focado</h1>
            </div>
          </div>
          {/** ciclos */}
          <div className="w-38 h-16 bg-gray-50 rounded-2xl flex justify-center items-center gap-2 ">
            <div className="bg-neuro-light-green p-1 px-2 rounded-xl">
              <RefreshCcwDot />
            </div>
            <div className="flex-col">
              {cycles}
              <h1 className="text-xs">Ciclos Feitos</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
