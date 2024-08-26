import Sidebar from '@/components/layout/sidebar'
import NewAnalysisCard from '@/components/newAnalysisCard'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout
})

function AuthLayout() {
  return (
    <div className='w-full h-full flex flex-row'>
    <Sidebar />
    <section className='w-[calc(100vw-280px)] h-full flex flex-col'>
      <header className='h-16 w-full flex flex-row items-center px-10 justify-between bg-[#E0E7FF]'>
        <h2 className='text-2xl'>Welcome, Brian</h2>
        <div>
          <NewAnalysisCard />
        </div>
      </header>
      <div className='h-[calc(100vh-64px)] w-[calc(100vw-280px)] px-16 pt-20'>
        <Outlet />
      </div>
    </section>
  </div>
  )
}
