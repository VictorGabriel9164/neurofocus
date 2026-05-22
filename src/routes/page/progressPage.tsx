import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page/progressPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/page/progressPage"!</div>
}
