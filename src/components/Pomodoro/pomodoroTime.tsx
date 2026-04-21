import { usePomodoro } from "./Context/PomodoroContext";
import { Button } from "#/components/ui/button";

export default function PomodoroTime() {
  const { isRunning, setIsRunning, changeTime, formatTime, selectedTime } =
    usePomodoro();

  return (
    <>
      <div className="mb-12">
        {/* TIMER */}
        <div className="inline-flex m-4 mt-16 text-4xl font-bold border justify-center items-center bg-neuro-light-blue rounded-2xl p-4">
          {formatTime()}
          <h1 className="text-xl mt-12 font-light ">
            {selectedTime === "25" && "/25:00"}
            {selectedTime === "50" && "/50:00"}
            {selectedTime === "15" && "/15:00"}
          </h1>
        </div>
      </div>
      {/* CONTROLES */}
      <div className="flex justify-center  ">
        <div className="flex gap-12 ">
          <Button
            onClick={() => setIsRunning((prev) => !prev)}
            variant={"outline"}
            className="flex items-center p-6 px-10  rounded-lg bg-neuro-dark-green text-white hover:bg-emerald-600 transition cursor-pointer"
          >
            ▶ {isRunning ? "Pausar" : "Iniciar"}
          </Button>

          <Button
            onClick={() => {
              setIsRunning(false);
              changeTime(selectedTime);
            }}
            variant={"outline"}
            className="flex items-center p-6 px-10 rounded-lg bg-white border-zinc-300 hover:bg-zinc-100 transition cursor-pointer"
          >
            ↻ Resetar
          </Button>
        </div>
      </div>
    </>
  );
}
