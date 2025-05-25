import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dasboard/Navbar'


const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'></div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default EmployeeDashboard
