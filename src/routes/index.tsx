import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold text-amber-600 flex items-center justify-center">pagina inicial</h1>
    </>
  );
}
