import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/neuroNavbar";
export const Route = createFileRoute("/page/pomodoroPage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col font-rubik w-full">
        <div className="w-full text-left px-12">
          <h1 className="font-bold text-3xl mt-4">Pomodoro</h1>
          <h1>Concentre-se e estude com foco</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-325 h-70 rounded-2xl bg-gray-200 mt-4"></div>
        </div>
      </main>
    </>
  );
}
