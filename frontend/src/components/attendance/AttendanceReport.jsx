import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AttendanceReport = () => {
  const [report, setReport] = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [dateFilter, setDateFilter] = useState()
  const [loading, setLoading] = useState(false)

  const fetchReport = async () => {
    try {
      setLoading(true)
      const query = new URLSearchParams({ limit, skip })
      if (dateFilter) {
        query.append("date", dateFilter)
      }
      const response = await axios.get(`https://ems-backend-w2zv.onrender.com/api/attendance/report?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData)
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData }));
        }
      }
      setLoading(false)
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  }

  // ✅ PDF Download Function
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    Object.entries(report).forEach(([date, records]) => {
      doc.setFontSize(14);
      doc.text(`Attendance Report - ${date}`, 14, y);
      y += 6;

      const tableData = records.map((entry, i) => [
        i + 1,
        entry.employeeId,
        entry.employeeName,
        entry.departmentName,
        entry.status,
      ]);

      autoTable(doc, {
        startY: y,
        head: [["S.No", "Employee ID", "Name", "Department", "Status"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 10 },
      });

      y = doc.lastAutoTable.finalY + 10;
    });

    doc.save("Attendance_Report.pdf");
  };

  return (
    <div className="min-h-screen px-6 mt-16 w-full p-10 bg-white">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Attendance Report</h3>
      </div>

      {/* Filter + Download PDF */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-4">
        <div>
          Filter By Date:
          <input
            type="date"
            className="border bg-gray-100 ml-2"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0)
            }}
          />
        </div>
        {/* ✅ Download Button */}
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {loading ? <div>Loading...</div> : Object.entries(report).map(([date, record]) => (
        <div className='mt-4 border-b' key={date}>
          <h2 className='text-xl font-semibold'>{date}</h2>
          <table className="w-full text-sm text-left text-gray-500 mt-4" border="1" cellPadding="10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {record.map((data, i) => (
                <tr key={data.employeeId} className="bg-white border-b">
                  <td className="px-6 py-3">{i + 1}</td>
                  <td className="px-6 py-3">{data.employeeId}</td>
                  <td className="px-6 py-3">{data.employeeName}</td>
                  <td className="px-6 py-3">{data.departmentName}</td>
                  <td className="px-6 py-3">{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='px-4 py-2 border bg-gray-100 text-lg font-semibold mt-4' onClick={handleLoadMore}>Load More</button>
        </div>
      ))}
    </div>
  )
}

export default AttendanceReport;
