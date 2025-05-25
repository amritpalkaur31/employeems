import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AttendanceHelper, columns } from '../../utils/AttendanceHelper.jsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [filteredAttendance, setFilterAttendance] = useState([]);

  const statusChange = () => {
    fetchAttendance();
  }

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://ems-backend-w2zv.onrender.com/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const formattedData = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name ,
          name: att.employeeId.userId.name ,
         
          action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange = {statusChange} />,
        }));

        setAttendance(formattedData);
        setFilterAttendance(formattedData);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Failed to fetch employees.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(searchText)
    );
    setFilterAttendance(filtered);
  };
  if(!filteredAttendance){
    return<div>Loading...</div>
  }

  return (
    <div className="px-6 mt-24 w-full">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>

      {/* Search bar and Add New Employee button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-4">
        <input
          type="text"
          placeholder="Search by Emp. Name"
          className="px-2 py-2 border rounded w-full sm:w-40 md:w-60"
          onChange={handleFilter}
        />
        <p className='text-2xl'>Mark Employees For <span className='font-bold underline'>{new Date().toISOString().split("T")[0]}{" "}</span> </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm whitespace-nowrap mt-4 sm:mt-0"
        >
          Attendance Report
        </Link>
      </div>

      {/* Employee Table */}
      <div className="mt-5 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredAttendance}
          progressPending={Loading}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default Attendance;

