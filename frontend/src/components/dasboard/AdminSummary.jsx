import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import axios from 'axios'
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
  FaMoneyBillWave,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

useEffect(() => {
  const fetchSummary = async () =>{
    try{
      const summary = await axios.get('https://ems-backend-w2zv.onrender.com/api/dashboard/summary',{
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
      })
      setSummary(summary.data)
    }catch(error){
      if(error.response){
        alert(error.response.data.error)
      }
      console.log(error.message)
    }
  }
  fetchSummary()

},[])
if(!summary) {
  return <div>Loading..</div>
}

  return (
    <div className="px-4 w-full mt-12 bg-gray-100 min-h-screen py-8">
  <h3 className="text-2xl text-center font-bold mb-8">Dashboard Overview</h3>

  <div className="w-full flex justify-center mt-4">
    <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-500"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-500"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-red-700"
        />
      </div>
    </div>
  </div>

  <div className="mt-12">
    <h4 className="text-center text-2xl font-bold">Leave Details</h4>

    <div className="mt-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaFileAlt />}
          text="Leave Applied"
          number={summary.leaveSummary.appliedFor}
          color="bg-indigo-500"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaCheckCircle />}
          text="Leave Approved"
          number={summary.leaveSummary.approved}
          color="bg-green-600"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaHourglassHalf />}
          text="Leave Pending"
          number={summary.leaveSummary.pending}
          color="bg-yellow-600"
        />
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <SummaryCard
          icon={<FaTimesCircle />}
          text="Leave Rejected"
          number={summary.leaveSummary.rejected}
          color="bg-red-600"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default AdminSummary;
