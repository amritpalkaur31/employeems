import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    Pencil,
    DollarSign,
    CalendarDays,
  } from "lucide-react"; 

// TABLE COLUMNS CONFIG
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "60px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
      width: "150px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
      width: "100px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
      width: "150px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
      width: "120px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

// API TO FETCH DEPARTMENTS (if needed elsewhere)
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("https://ems-backend-w2zv.onrender.com/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

//employees for salary form

export const getemployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

// ACTION BUTTONS COMPONENT
export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-teal-700 whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        <Eye size={16} />
        View
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-blue-700 whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        <Pencil size={16} />
        Edit
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        <DollarSign size={16} />
        Salary
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        <CalendarDays size={16} />
        Leave
      </button>
    </div>
    
  );
};
