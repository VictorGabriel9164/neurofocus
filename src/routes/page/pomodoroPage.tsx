import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/page/pomodoroPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/page/pomodoroPage"!</div>
}
