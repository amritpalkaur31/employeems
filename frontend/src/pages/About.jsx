import React from "react";
import Header from '../components/Header';  // adjust path if needed
import { FaUsers, FaCog, FaHeadset } from "react-icons/fa";

const aboutItems = [
  {
    icon: FaUsers,
    title: "Team Collaboration",
    desc: "Empower your team with seamless collaboration and efficient management.",
  },
  {
    icon: FaCog,
    title: "Customizable Settings",
    desc: "Configure departments, leave policies, payrolls, and more to fit your needs.",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Support",
    desc: "Our support team is here to help you 24/7 with any questions or issues.",
  },
];

const About = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-teal-600 px-4">
        <div className="max-w-5xl p-8 bg-white rounded-lg shadow-lg text-gray-900 dark:text-white w-full transition-all duration-500">
          {/* Shimmering Heading */}
          <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg relative overflow-hidden">
            About Us
            <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none" />
          </h1>

          <p className="text-center text-black text-lg mb-10 max-w-3xl mx-auto">
            Welcome! We are dedicated to providing the best employee management
            services. Our EMS helps organizations manage records, leaves,
            payrolls, and performance with ease.
          </p>

          {/* About Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {aboutItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 text-gray-800 dark:text-white"
                >
                  <Icon className="text-6xl text-teal-500 mb-4 transition-transform duration-300 group-hover:rotate-12" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
