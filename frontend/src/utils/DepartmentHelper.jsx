import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pencil, Trash } from "lucide-react";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "150px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "300px",
  },
  {
    name: "Action",
    cell: (row) => <DepartmentButtons id={row._id} />,  // Consistent with prop name `id`
    center: true,
  }
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`https://ems-backend-w2zv.onrender.com/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-blue-700 whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}  // Corrected to `id`
      >
        <Pencil size={16} />
        Edit
      </button>
      <button
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 whitespace-nowrap"
        onClick={handleDelete}  // Corrected to pass no argument here
      >
        <Trash size={16} />
        Delete
      </button>
    </div>
  );
};
