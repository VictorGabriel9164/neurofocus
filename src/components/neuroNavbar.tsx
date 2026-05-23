import { Link } from "@tanstack/react-router";
import NeuroFocusIcon from "#/assets/icons/neurofocusicon.png";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
    <div className="flex items-center justify-center gap-8">
      <img src={NeuroFocusIcon} alt="neuro focus icon" className="w-4 mt-3 scale-1050" />
      <Link to="/page/home">
      <h1 className="text-xl font-bold text-black text-left font-lora">
        NeuroFocus
      </h1>
      </Link>
    </div>

      <div className="flex items-center gap-6">
        <Link
          to="/page/home"
          className="transition hover:text-neuro-green hover:underline"
        >
          Início
        </Link>

        <Link
          to="/page/gerenciartarefaPage"
          className="transition hover:text-neuro-green hover:underline"
        >
          Tarefas
        </Link>

        <Link
          to="/page/progressPage"
          className="transition hover:text-neuro-green hover:underline"
        >
          Progresso
        </Link>

        <Link
        to="/page/pomodoroPage"
        className="transition hover:text-neuro-green hover:underline"
        >
        Pomodoro
        </Link>
      </div>
    </nav>
  );
}