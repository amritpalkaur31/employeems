import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const LeaveDetail = () => {
    const {id} = useParams()
    const[leave, setleave] = useState(null)
    const navigate = useNavigate()

        useEffect(() => {
            const fetchLeave = async () => {
              try {
                const response = await axios.get(`https://ems-backend-iota.vercel.app/api/leave/detail/${id}`, 
                    {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                });
        
                if (response.data.success) {
                  setleave(response.data.leave)
                }
              } catch (error) {
                if(error.response && !error.response.data.success) {
                  alert(error.response.data.error)
              }
              }
            };
        
            fetchLeave();
          }, []);

const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://ems-backend-w2zv.onrender.com/api/leave/${id}`, {status},
            {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
            navigate('/admin-dashboard/leaves')       
}
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
      }
      }
}
  return (
    <>{leave ? (
<div className='flex-1 mt-16 p-4 max-w-3xl mx-auto bg-white rounded-md shadow-md'>        <h2 className='text-2xl font-bold mb-8 text-center'>
            Leave Details
        </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div> 
        <img src={`https://ems-backend-w2zv.onrender.com/${leave.employeeId.userId.profileImage}`} 
        className='rounded-full border w-72'
        />
      </div>
      <div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>Name:</p>
            <p className='font-medium'>{leave.employeeId.userId.name}</p>
        </div>
        <div className='flex space=x-3 mb-2'>
            <p className='text-lg font-bold'>Employee ID:</p>
            <p className='font-medium'>{leave.employeeId.employeeId}</p>
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>Leave Type:</p>
            <p className='font-medium'>{leave.leaveType}</p>
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>Reason:</p>
            <p className='font-medium'>{leave.reason}</p>
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>Department:</p>
            <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>Start Date:</p>
            <p className='font-medium'>{new Date (leave.startDate).toLocaleDateString()}</p>
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>End Date:</p>
            <p className='font-medium'>{new Date (leave.endDate).toLocaleDateString()}</p>      
        </div>
        <div className='flex space-x-3 mb-2'>
            <p className='text-lg font-bold'>
            {leave.status === "pending" ? "Action:" : "Status:"}
            </p>
            {leave.status === "pending" ? (
                <div className='flex space-x-2'>
                    <button className='px-2 py-0.5 bg-green-300 hover:bg-green-400'
                    onClick={() =>changeStatus(leave._id, "Approved") }>Approve</button>
                    <button className='px-2 py-0.5 bg-red-300 hover:bg-red-400'
                    onClick={() =>changeStatus(leave._id, "Rejected") }>Reject</button>

                </div>
            ): 
            <p className='font-medium'>{leave.status}</p>
        }
        </div>
      </div>
    </div>
</div>
): <div>Loading...</div>}</>
  )
}

export default LeaveDetail;
