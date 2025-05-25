import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
    const navigate = useNavigate();
    const {user } = useAuth();
      const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
        const [error, setError] = useState(null);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setSetting({ ...setting, [name]: value });
        };
        const handleSubmit = async (e) => {
          e.preventDefault();
        
          if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
        
          try {
            const response = await axios.put(
              "https://ems-backend-w2zv.onrender.com/api/setting/change-password",
              setting,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
        
            if (response.data.success) {
              setError(""); // clear error
              alert("Password changed successfully!");
        
              // Redirect based on role
              if (user.role === "admin") {
                navigate("/admin-dashboard");
              } else if (user.role === "employee") {
                navigate("/employee-dashboard"); // adjust this to your actual employee dashboard route
              } else {
                navigate("/login"); // fallback
              }
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              setError(error.response.data.error);
            } else {
              setError("Something went wrong. Please try again.");
            }
          }
        };
        
    
  return (


      <div className="w-full mt-6 min-h-screen flex justify-center items-center px-4 bg-gray-50">
        <div className="max-w-4xl w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
          <p className='text-red-500'>{error}</p>
          <form onSubmit={handleSubmit}>
            <div>
            <label className='text-sm font-medium text-gray-700'>Old Password</label>
            <input
                  type="password"
                  name="oldPassword"
                  onChange={handleChange}
                  placeholder="Insert Old Password"
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                  required
                />
             </div>

             <div>
            <label className='text-sm font-medium text-gray-700'>New Password</label>
            <input
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  placeholder="Insert New Password"
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                  required
                />
             </div>

             <div>
            <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
            <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="ConfirmPassword"
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                  required
                />
             </div>

             <button
              type="submit"
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>
              Change Password
            </button>
          </form>
        </div>
      </div>
  );
};

export default Setting;
