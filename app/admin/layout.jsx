import React from 'react'
import SideNav from './_Components/SideNav'
import Provider from './Provider'

const Adminlayout = ({children}) => {
  return (
    <div>
    <div className='w-24 fixed'>
      <SideNav/>
      </div> 
      <div className='ml-24'>
        <Provider>
      {children}
      </Provider>
    </div>
    </div>
  )
}

export default Adminlayout
