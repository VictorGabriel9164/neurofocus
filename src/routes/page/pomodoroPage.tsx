import { createFileRoute } from "@tanstack/react-router";
import { PomodoroProvider } from "#/components/Pomodoro/Context/PomodoroContext";
import Navbar from "#/components/neuroNavbar";
import Pomodoro from "#/components/Pomodoro/pomodoro";
import PomodoroChangeTime from "#/components/Pomodoro/pomodoroChangetime";


export const Route = createFileRoute("/page/pomodoroPage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PomodoroProvider>
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col font-rubik w-full justify-center items-center">
        <div className="w-full text-left px-12">
          <h1 className="font-bold text-3xl mt-4">Pomodoro</h1>
          <h1>Concentre-se e estude com foco</h1>
        </div>

        <div className="flex justify-center items-center">
          <Pomodoro />
        </div>

        <div className="mt-12">
          <PomodoroChangeTime />
        </div>
      </main>
    </PomodoroProvider>
  );
}