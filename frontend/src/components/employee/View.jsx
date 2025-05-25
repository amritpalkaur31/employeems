import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://employeems-backend-x0a7.onrender.com/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="w-full min-h-screen flex justify-center items-center px-4 bg-gray-50">
          <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Employee Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Profile Image */}
              <div className="flex justify-center">
                <img
                  src={`https://ems-backend-w2zv.onrender.com/${employee.userId.profileImage}`}
                  alt="Profile"
                  className="rounded-full border w-52 h-52 object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Name:</p>
                  <p className="font-medium">{employee.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{employee.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Date of Birth:</p>
                  <p className="font-medium">
                    {new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Gender:</p>
                  <p className="font-medium">{employee.gender}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{employee.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Marital Status:</p>
                  <p className="font-medium">{employee.maritalStatus}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Contact:</p>
                  <p className="font-medium">{employee.contact}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Address:</p>
                  <p className="font-medium">{employee.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default View;
