import { UserButton } from '@clerk/nextjs';
import { BarChart, Brush, Layers3, Settings } from 'lucide-react'
import React from 'react'

const SideNav = () => {
    const MenuList=[{
        id:1,
        name:'pages',
        icon:Layers3
    },
    {
        id:2,
        name:'Style',
        icon:Brush
    },
    {
        id:3,
        name:'stats',
        icon:BarChart
    },
    {
        id:4,
        name:'Settings',
        icon:Settings
    }
    ]
    
  return (
    <div className='p-4 bg-[#00000052] h-screen'>
      {MenuList.map((Menu,index)=>(
      <div className='p-2 py-4 rounded-lg bg-primary flex items-center justify-center mb-5 
      tooltip-secondary cursor-pointer tooltip tooltip-right
      ' data-tip={Menu.name}>
        <Menu.icon className='text-white text-center' />
      </div>
      )) }
    <div className='fixed bottom-5 px-4'>
      <UserButton/>
    </div>
    </div>
  );
}

export default SideNav;
