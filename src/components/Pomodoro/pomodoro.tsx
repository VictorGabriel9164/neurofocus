import PomodoroTime from "./pomodoroTime";
export default function Pomodoro() {
  return (
    <div className="w-355 h-80 rounded-2xl bg-gray-200">
      {/* Header */}
      <div className="flex items-start justify-start flex-col">
        <div className="text-sm font-medium text-neuro-light-green bg-white rounded-2xl p-1 m-2">Foco</div>

        <div className="text-lg font-medium m-2 ">tempo da sessao</div>
      </div>
      {/* Blocos de progresso */}
      

      {/* Tempo */}
      <div className="text-2xl font-semibold mb-6">
        {/*texto onde vai ficar o horario ex:10:35/15:00*/}
        <PomodoroTime/>
      </div>
    </div>
  );
}
