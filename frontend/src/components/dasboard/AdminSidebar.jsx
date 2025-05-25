import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCogs,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaRegCalendarAlt ,
} from 'react-icons/fa';
import {AiOutlineFileText} from 'react-icons/ai';

const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white z-40 flex flex-col">
      {/* Sidebar Header */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-800 h-14 flex items-center justify-center">
        <h3 className="text-2xl font-bold font-pacific">🚀 EMS</h3>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 space-y-1">
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to = {`/admin-dashboard/attendance`}
                className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaRegCalendarAlt />
                    <span>Attendance</span>
                </NavLink>

        <NavLink to = {`/admin-dashboard/attendance-report`}
                className= {({isActive}) => `${isActive ? "bg-teal-500" :" " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <AiOutlineFileText />
                    <span>Attendance Report</span>
                </NavLink>

        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-3 px-5 py-2.5 hover:bg-teal-700 rounded transition-colors`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
