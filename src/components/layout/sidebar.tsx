import { Link } from '@tanstack/react-router'
import { LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className='h-screen w-[280px] flex flex-col bg-[#122259] p-4 py-6 gap-8'>
      <h1 className="text-white text-4xl font-semibold">Fracnet</h1>
      <ul className='flex flex-col gap-6'>
        <Link as='li' to='/' className='h-10 flex flex-row gap-3 text-[#EBEFFF]'>
          <LayoutDashboard /> Dashboard
        </Link> 
        <Link as='li' to='/patientlist' className='h-10 flex flex-row gap-3 text-[#EBEFFF]'>
          <Users /> Patient's List
        </Link> 
        <Link as='li' to='/manage'className='h-10 flex flex-row gap-3 text-[#EBEFFF]'>
          <Settings /> Manage
        </Link> 
      </ul>
      <div className="flex flex-1 flex-col justify-end">

      <button className='h-10 flex flex-row gap-2 text-[#EBEFFF]'>
        <LogOut /> Log Out
      </button> 
      </div>
    </aside>
  )
}

export default Sidebar