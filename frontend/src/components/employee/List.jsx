import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeButtons, columns } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://ems-backend-w2zv.onrender.com/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const formattedData = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                src={`https://ems-backend-w2zv.onrender.com/${emp.userId?.profileImage}`}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(formattedData);
          setFilteredEmployees(formattedData);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Failed to fetch employees.");
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchText)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="min-h-screen px-6 mt-16 w-full p-10 bg-white">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      {/* Search bar and Add New Employee button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Emp. Name"
          className="px-4 py-2 border rounded w-full sm:w-72 md:w-96"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm whitespace-nowrap mt-4 sm:mt-0"
        >
          Add New Employee
        </Link>
      </div>

      {/* Employee Table */}
      <div className="mt-5 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={empLoading}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default List;
