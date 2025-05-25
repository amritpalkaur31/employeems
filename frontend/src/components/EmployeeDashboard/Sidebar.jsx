import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaTachometerAlt, FaUsers, FaBuilding, FaCogs, FaCalendarAlt, FaMoneyBillWave, FaRegCalendarAlt  } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Sidebar = () => {
    const {user} = useAuth()
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white z-40 flex flex-col">
      {/* Sidebar Header */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-800 h-14 flex items-center justify-center">
        <h3 className="text-2xl font-bold font-pacific">🚀 EMS</h3>
      </div>
      <div>
      <nav className="flex-1 py-4 space-y-1">
        <NavLink to = "/employee-dashboard" 
        className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-3 py-2.5 px-5 hover:bg-teal-700 rounded transition-colors `}
        end >

            <FaTachometerAlt />
            <span>Dashboard</span>
        </NavLink>
        <NavLink to = {`/employee-dashboard/profile/${user._id}`}
        className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-3 py-2.5 px-5 hover:bg-teal-700 rounded transition-colors  `}>
            <FaUsers />
            <span>My Profile</span>
        </NavLink>
        <NavLink to = {`/employee-dashboard/leaves/${user._id}`}
        className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-3 py-2.5 px-5 hover:bg-teal-700 rounded transition-colors `}>
            <FaBuilding />
            <span>Leaves</span>
        </NavLink>
        <NavLink to = {`/employee-dashboard/salary/${user._id}`}
        className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-3 py-2.5 px-5 hover:bg-teal-700 rounded transition-colors `}>
            <FaMoneyBillWave />
            <span>Salary</span>
        </NavLink>
        
        <NavLink to = "/employee-dashboard/setting" 
        className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-3 py-2.5 px-5 hover:bg-teal-700 rounded transition-colors `}>
            <FaCogs />
            <span>Settings</span>
        </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar

