import { createFileRoute } from "@tanstack/react-router";
import { PomodoroProvider } from "#/components/Pomodoro/Context/PomodoroContext";
import Navbar from "#/components/neuroNavbar";
import Pomodoro from "#/components/Pomodoro/pomodoro";
import PomodoroChangeTime from "#/components/Pomodoro/pomodoroChangetime";
import PomodoroCycle from "#/components/Pomodoro/pomodoroCycle";


export const Route = createFileRoute("/page/pomodoroPage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PomodoroProvider>
      <header>
        <Navbar />
      </header>

      <main className="font-rubik w-full">
        <div className="w-full text-left px-12">
          <h1 className="font-bold text-3xl mt-6">Pomodoro</h1>
          <h1>Concentre-se e estude com foco</h1>
        </div>

        <div className="flex items-start gap-12 ml-18 mt-16">
          <Pomodoro />
          <div className="mt-2 space-y-8">
          <PomodoroChangeTime />
          <PomodoroCycle />
          </div>
        </div>
      </main>
    </PomodoroProvider>
  );
}