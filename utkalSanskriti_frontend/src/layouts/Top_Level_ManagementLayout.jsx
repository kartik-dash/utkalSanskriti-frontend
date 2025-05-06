// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import { Route, Routes } from 'react-router-dom';
// import TopRoutes from '../routes/TopRoutes';
// import { useSelector } from "react-redux";


// const Top_Level_ManagementLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const role = useSelector((state) => state.auth.role);

//   if (!role) {
//     return <div>Loading...</div>;
//   }
//   const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);

//   return (
//     <div className="flex min-h-screen pt-16">
//       <Sidebar isOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} role={role} />
//       <div className="flex-grow flex flex-col ml-64">
//         <Header toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
//         <main className="flex-grow p-6 overflow-auto">
//           <Routes>
//             {TopRoutes.map((route) => (
//               <Route key={route.path} path={route.path} element={<route.component />} />
//             ))}
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Top_Level_ManagementLayout;



import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Route, Routes } from 'react-router-dom';
import TopRoutes from '../routes/TopRoutes';
import { useSelector } from "react-redux";
import { Menu, X } from 'lucide-react';


const Top_Level_ManagementLayout = () => {

const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = useSelector((state) => state.auth.role);

  if (!role) {
    return <div>Loading...</div>;
  }
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  if (!Array.isArray(TopRoutes)) {
    console.error("TopRoutes is not an array:", TopRoutes);
    return <div>Error: Invalid routes configuration</div>;
  }


  return (

    <div className="min-h-screen">
      <div className="relative flex min-h-screen bg-gray-100">
      {/* <Sidebar isOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} role={role} /> */}
      <Sidebar isOpen={sidebarOpen} role={role} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col rem_main_container w-[100%]">
        <Header toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

        {/* {/ Sidebar Toggle Button for Mobile /} */}
        <button
         className="fixed z-[99] top-[15px] left-4 bg-gray-900 text-white p-2 rounded-full shadow-lg lg:hidden"
         onClick={toggleSidebar}
       >
         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
       </button>

                  {/* {/ Dark Backdrop on Small Screens (closes sidebar on click) /} */}
                  {sidebarOpen && (
                <div
                className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

        <main className="flex-grow  overflow-auto">
          <Routes>
            {TopRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
    </div>
  );
};
export default Top_Level_ManagementLayout;
