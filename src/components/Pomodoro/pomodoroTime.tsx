
import { usePomodoro } from "./Context/PomodoroContext";

export default function PomodoroTime() {
  const {
    isRunning,
    setIsRunning,
    changeTime,
    formatTime,
    selectedTime,
    
  } = usePomodoro();

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>

      {/* TIMER */}
      <div className="flex justify-start items-start m-5 text-4xl font-bold">
        {formatTime()}
      </div>

      {/* CONTROLES */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
        >
          ▶ {isRunning ? "Pausar" : "Iniciar"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            changeTime(selectedTime);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:bg-zinc-50 transition"
        >
          ↻ Resetar
        </button>
      </div>
    </div>
  );
}