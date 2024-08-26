import { IAuthContext } from '@/providers/auth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
  auth: IAuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <main className='w-screen h-screen'> 
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
})
