import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MasterAdminLayout from './layouts/MasterAdminLayout';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';
import Top_Level_ManagementLayout from './layouts/Top_Level_ManagementLayout';
import Mid_Level_ManagementLayout from './layouts/Mid_Level_ManagementLayout';
import Low_Level_ManagementLayout from './layouts/Low_Level_ManagementLayout';
import Support_ManagementLayout from './layouts/Support_ManagementLayout';
import Manage_Gov_ManagementLayout from './layouts/Manage_Gov_ManagementLayout';
import Gov_ManagementLayout from './layouts/Gov_ManagementLayout';
import Temp_Level_ManagementLayout from './layouts/Temp_Level_ManagementLayout';
import Guide_Level_ManagementLayout from './layouts/Guide_Level_ManagementLayout';
import UserLayout from './layouts/UserLayout';

// import UserLayout from './layouts/UserLayout';
import { useSelector } from "react-redux";
import UserRoutes from './routes/UserRoutes'; // Importing user routes

import Signin from './pages/Login';  // Assuming this is your Home page
import ScrollTop from './components/Scroll/ScrollTop';
// import { getRoleFromToken } from './utils/tokenUtils';
const App = () => {
  // const [userRole, setUserRole] = useState(null);
  const userRole = useSelector((state) => state.auth.role);
  // useEffect(() => {
  //   // Dynamically get role from the token when needed
  //   const role = getRoleFromToken();
  //   setUserRole(role);
  // }, []); // Run once on mount to get the role from sessionStorage

  return (
    <Router>
      <ScrollTop/>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Conditional Route rendering based on user role */}
          {userRole === 'MASTER_ADMIN' && <Route path="*" element={<MasterAdminLayout />} />}
          {userRole === 'CLIENT' && <Route path="*" element={<ClientLayout />} />}
          {userRole === 'ADMIN' && <Route path="*" element={<AdminLayout />} />}
          {userRole === 'TOP_LEVEL' && <Route path="*" element={<Top_Level_ManagementLayout />} />}
          {userRole === 'MID_LEVEL' && <Route path="*" element={<Mid_Level_ManagementLayout />} />}
          {/* {userRole === 'LOW_LEVEL' && <Route path="*" element={<Low_Level_ManagementLayout />} />} */}
          {userRole === 'TEAM_LEADER' && <Route path="*" element={<Low_Level_ManagementLayout />} />}
          {userRole === 'SUPPORT_SERVICE' && <Route path="*" element={<Support_ManagementLayout />} />}
          {userRole === 'GOVERMENT_MANAGEMENT' && <Route path="*" element={<Manage_Gov_ManagementLayout />} />}
          {userRole === 'GOVERMENT' && <Route path="*" element={<Gov_ManagementLayout />} />}
          {userRole === 'TEMPLE_ADMIN' && <Route path="*" element={<Temp_Level_ManagementLayout />} />}
          {userRole === 'GUIDE' && <Route path="*" element={<Guide_Level_ManagementLayout />} />}
          {/* <Route path="/" element={<Signin />} />
          <Route path="/login" element={<Signin />} /> */}
          <Route path="/" element={<UserLayout />}>
            {/* Nested routes for user pages */}
            {UserRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
