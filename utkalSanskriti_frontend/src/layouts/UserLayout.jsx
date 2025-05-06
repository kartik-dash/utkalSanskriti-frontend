// // layouts/UserLayout.js
// import React from 'react';
// import Navbar from '../components/Navbar'; // Navbar component
// import Footer from '../components/Footer'; // Navbar component
// import { Outlet } from 'react-router-dom'; // Outlet for rendering child routes

// const UserLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar - Common for all pages in the UserLayout */}
//       <Navbar />

//       {/* Main content area where the child routes will be rendered */}
//       <main className="flex-grow">
//         <Outlet />  {/* This will render the child routes based on the active route */}
//       </main>
//       <Footer />
//       {/* You can optionally add a Footer here */}
//     </div>
//   );
// };

// export default UserLayout;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Menu, X } from "lucide-react";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = useSelector((state) => state.auth.role);

  // Automatically open sidebar when user logs in
  useEffect(() => {
    if (role) {
      setSidebarOpen(true);
    }
  }, [role]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* {role && (
        <>
          <Sidebar isOpen={sidebarOpen} role={role} />

          <button
            className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
        </>
      )} */}

      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
