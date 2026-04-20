import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page/criarConta')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/page/criarConta"!</div>
}
