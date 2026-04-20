import { Button } from "#/components/ui/button";
import { usePomodoro } from "./Context/PomodoroContext";

import pomodorotimer from "#/assets/icons/pomodorotimer.png";
import vasodeplanta from "#/assets/icons/vasodeplantaicon.png";
import folha from "#/assets/icons/folha.png";

export default function PomodoroChangeTime() {
  const { changeTime } = usePomodoro();

  return (
    <div className="w-156 h-46 bg-gray-200 rounded-2xl flex items-center justify-center flex-col">
      <h1 className="m-2 font-bold">Escolha um preset:</h1>

      <div className="flex items-center justify-between gap-8 mt-6">

        <Button onClick={() => changeTime("25")} className="w-38 h-16 bg-gray-100 hover:bg-neuro-dark-green rounded-2xl flex items-center gap-2 px-3">
          <img src={pomodorotimer} className="w-8" />
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">25 min</h1>
            <h1>Foco</h1>
          </div>
        </Button>

        <Button onClick={() => changeTime("50")} className="w-48 h-16 bg-gray-100 rounded-2xl hover:bg-neuro-dark-green  flex items-center gap-2 px-3">
          <img src={vasodeplanta} className="w-6 scale-150" />
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">50 min</h1>
            <h1>Foco profundo</h1>
          </div>
        </Button>

        <Button onClick={() => changeTime("15")} className="w-38 h-16 bg-gray-100 rounded-2xl hover:bg-neuro-dark-green flex items-center gap-2 px-3">
          <img src={folha} className="w-8 scale-200" />
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">15 min</h1>
            <h1>Foco rápido</h1>
          </div>
        </Button>

      </div>
    </div>
  );
}