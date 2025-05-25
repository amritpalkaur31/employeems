import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaCogs, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='fixed top-0 left-64 w-[calc(100%-16rem)] h-14 bg-gradient-to-br from-teal-700 to-teal-900 text-white flex items-center justify-between px-4 shadow z-50'>
      <h2 className="text-base sm:text-lg md:text-xl tracking-wide font-semibold">
        Welcome, {user.name}
      </h2>

      <div className="relative" ref={dropdownRef}>
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-white cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-50">
            
            <Link to="/admin-dashboard/setting" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2">
              <FaCogs /> Settings
            </Link>
            <button
              onClick={logout}
              className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
