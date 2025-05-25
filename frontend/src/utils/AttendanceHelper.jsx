import React from 'react';
import axios from 'axios';

// ✅ Add this export back
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px"
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (newStatus, employeeId) => {
    try {
      const response = await axios.put(
        `https://ems-backend-w2zv.onrender.com/api/attendance/update/${employeeId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) { // note: check spelling in backend
        statusChange();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      {status === null ? (
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-teal-700 whitespace-nowrap"
            onClick={() => markEmployee("Present", employeeId)}>
            Present
          </button>

          <button
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-blue-700 whitespace-nowrap"
            onClick={() => markEmployee("Absent", employeeId)}>
            Absent
          </button>

          <button
            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-yellow-700 whitespace-nowrap"
            onClick={() => markEmployee("Sick", employeeId)}>
            Sick
          </button>

          <button
            className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-black rounded text-sm hover:bg-red-700 whitespace-nowrap"
            onClick={() => markEmployee("Leave", employeeId)}>
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};
