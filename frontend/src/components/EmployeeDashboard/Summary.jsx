import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

const Summary = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <div
      className="px-4 w-full bg-gray-100 py-8 flex items-center justify-center min-h-screen bg-cover bg-center transition-opacity duration-700"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80)',
      }}    >
      <div className="flex items-center gap-6 bg-white bg-opacity-90 shadow-lg rounded-lg px-8 py-6">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
          {getInitials(user.name)}
        </div>

        {/* Greeting Text */}
        <div>
          <p className="text-gray-700 text-lg font-medium">{greeting},</p>
          <p className="text-xl font-bold text-gray-900">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
