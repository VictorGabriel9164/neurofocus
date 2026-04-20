import Navbar from "#/components/neuroNavbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page/home")({ component: App });

function App() {
  return (
    <>
      <Navbar />
    </>
  );
}
