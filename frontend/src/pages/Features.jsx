import React from "react";
import Header from '../components/Header';  // adjust path if needed
import {
  FaUsers,
  FaChartLine,
  FaClock,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const featuresList = [
  {
    icon: FaUsers,
    title: "Employee Management",
    desc: "Add, update, and organize employee profiles securely and efficiently.",
  },
  {
    icon: FaClock,
    title: "Attendance Tracking",
    desc: "Monitor check-ins, track leaves, and approve requests in real time.",
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Payroll Automation",
    desc: "Generate salaries, manage deductions, and generate pay slips.",
  },
];

const Features = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-teal-600 px-4">
        <div className="max-w-5xl p-8 bg-white rounded-lg shadow-lg text-gray-900 dark:text-white w-full transition-all duration-500">
          {/* Shimmering Heading */}
          <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg relative overflow-hidden">
            Key Features
            <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none" />
          </h1>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {featuresList.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 text-gray-800 dark:text-white"
                >
                  <Icon className="text-5xl text-teal-500 mb-3 transition-transform duration-300 group-hover:rotate-12" />
                  <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
