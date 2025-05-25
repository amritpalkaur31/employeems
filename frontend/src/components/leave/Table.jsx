import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Tag } from 'antd';
import axios from 'axios';
import { LeaveButtons } from '../../utils/LeaveHelper';
const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  // Fetch leave data from API
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('https://ems-backend-w2zv.onrender.com/api/leave', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

      if (response.data.success) {
        console.log("API Leaves Response: ", response.data.leaves); // 🔍 Debug log
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || 'N/A',
          name: leave.employeeId?.userId?.name || 'N/A',
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || 'N/A',
          days:
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        console.log("Mapped Leave Data: ", data); // 🔍 Debug log
        setLeaves(data);
        setFilteredLeaves(data);
      }
      } catch (error) {
        console.error('Error fetching leaves: ', error);
        if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
        }
      }
      };

      useEffect(() => {
         fetchLeaves();
       }, []);


  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  // Columns
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: 70,
      sorter: (a, b) => a.sno - b.sno,
    },
    {
      title: 'Emp ID',
      dataIndex: 'employeeId',
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Days',
      dataIndex: 'days',
      sorter: (a, b) => a.days - b.days,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'Approved'
            ? 'green'
            : status === 'Rejected'
            ? 'red'
            : 'gold';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action', // ✅ this will use the actual button you defined
    },
  ];

  return (
    <>
    {filteredLeaves ? (
      <div className="min-h-screen px-6 mt-16 w-full p-10 bg-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Manage Leaves</h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Emp ID"
            className="px-4 py-2 w-full sm:w-auto border rounded shadow-sm"
            onChange={filterByInput}
          />
          <div className="space-x-2">
            <button
              className="px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              onClick={() => filterByButton('Pending')}
            >
              Pending
            </button>
            <button
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => filterByButton('Approved')}
            >
              Approved
            </button>
            <button
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => filterByButton('Rejected')}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
            responsive
            highlightOnHover
          />
        </div>
      </div>
    ) : (
      <div className="p-6 text-center">Loading...</div>
    )}
  </>
);
};

export default Table;
