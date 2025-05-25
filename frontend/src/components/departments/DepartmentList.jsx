import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from "../../utils/DepartmentHelper";
import axios from 'axios';
import { DepartmentButtons } from '../../utils/DepartmentHelper';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] =  useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete = async () => {
    fetchDepartments()
  }
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get("https://ems-backend-w2zv.onrender.com/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
          }));
          setDepartments(data);
          setFilteredDepartments(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
      }
      }finally{
        setDepLoading(false)
      }
    };



  useEffect(() => {
 

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)

  }

  return (
    <>{depLoading ? <div>Loading...</div> : 
      <div className="px-4 sm:px-6 mt-24 w-full">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
    
      {/* Search bar and Add Department Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Dep. Name"
          className="px-4 py-2 border rounded w-full sm:w-auto"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm whitespace-nowrap w-full sm:w-auto text-center"
        >
          Add New Department
        </Link>
      </div>
    
      {/* Department Table */}
      <div className="mt-5 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          pagination
          responsive
          highlightOnHover
        />
      </div>
    </div>
    
}</>
  )
}

export default DepartmentList
