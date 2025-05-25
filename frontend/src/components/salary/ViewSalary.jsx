import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `https://ems-backend-w2zv.onrender.com/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const filterSalaries = (e) => {
    const query = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className="min-h-screen px-6 mt-16 w-full max-w-7xl mx-auto p-10 bg-white">
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Salary History</h3>
          </div>

          {user.role !== "employee" && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search by Emp ID"
                className="px-4 py-2 border rounded w-full sm:w-72 md:w-96"
                onChange={filterSalaries}
              />
            </div>
          )}
          {filteredSalaries.length > 0 ? (
            <table
              className="w-full text-sm text-left text-gray-500 mt-4"
              border="1"
              cellPadding="10"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr
                    key={
                      salary._id || `${salary.employeeId.employeeId}-${index}`
                    }
                    className="bg-white border-b"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-4">No Records</div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewSalary;
