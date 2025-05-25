import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Eye,
  } from "lucide-react"; 


export const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "70px"
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
        width: "120px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
        width: "120px"
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
        width: "140px"
    },
    {
      name: "Department",
      selector: (row) => row.department,
        width: "170px"
    },
    {
        name: "Days",
        selector: (row) => row.days,
        sortable: true,
          width: "80px"
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
          width: "120px"
      },
    {
      name: "Action",
      selector: (row) => row.action,
      center: "true",
    },
  ];
  
export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };
    return(
        <button
        className="px-4 py-1 bg-blue-600 text-white rounded text-white hover:bg-teal-700"
        onClick={() => handleView(Id)}
        >
          <Eye size={16} />
          View
        </button>
    )
}
