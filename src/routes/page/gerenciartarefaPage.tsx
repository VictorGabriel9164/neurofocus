import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page/gerenciartarefaPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/page/gerenciartarefaPage"!</div>
}
