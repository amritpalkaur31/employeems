import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dasboard/AdminSidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dasboard/Navbar'

const AdminDashboard = () => {
  const {user, loading} = useAuth()
 

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'></div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdminDashboard
