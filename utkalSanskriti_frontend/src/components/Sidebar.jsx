import React, { useState } from "react";
import { logoutUser } from '../redux/thunks/authThunks';
import { useDispatch } from 'react-redux';
import { FolderOpen, Search, MapPin, MessageCircle, ShieldAlert, Car, CloudLightning, Bell, ClipboardList, Star, Send } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { MdTempleHindu } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  Home,
  User,
  Settings,
  LogOut,
  BarChart,
  ChevronDown,
  ChevronRight,
  FolderOpenDot,
  ReceiptText,
  ChartColumnIncreasing,

} from "lucide-react";

const Sidebar = ({ isOpen, setIsSidebarOpen, role }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState(null); // Track active menu item

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleMenuItemClick = (label) => {
    setActiveMenuItem(label); // Set the active menu item
  };

  const handleLogout = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(logoutUser(token))
        .then(() => {
          sessionStorage.clear();
          console.log('User logged out. Redirecting to /login');
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    }
  };

  const dispatch = useDispatch();


  let menuItems = [];

  if (role === "MASTER_ADMIN") {
    menuItems = [

      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/masteradmin_dashboard", label: "Master Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Create Admin", icon: <User size={24} /> },
      // { path: "/registration", label: "Registration", icon: <Settings size={24} /> },
      { path: "/Add_visitors", label: "All Visitors", icon: <FaUsers size={24} /> },
      { path: "/chat", label: "Chat Service", icon: <MessageCircle size={24} /> },
      { path: "/commonemergencysos", label: "Emergency Sos", icon: <ShieldAlert size={24} /> },
      { path: "/review", label: "Rate and Review", icon: <Star size={24} /> },
      { path: "/feedback", label: "Feedback", icon: <Send size={24} /> },
      { path: "/transport", label: "Transport Help", icon: <Car size={24} /> },
      { path: "/allbookings", label: "All Booking Details", icon: <FolderOpenDot size={24} /> },
      { path: "/destinationlist", label: "Destination Listing", icon: <MapPin size={24} /> },
    ];
  }
  if (role === "ADMIN") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/admindashboard", label: "Admin Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Create Top Level", icon: <FaUserPlus size={24} /> },
      // { path: "/registration", label: "Registration", icon: <Settings size={24} /> },
      { path: "/Add_visitors", label: "All Visitors", icon: <FaUsers size={24} /> },
      // { path: "/emergency", label: "Emergency Sos", icon: <ChartColumnIncreasing size={24} />},
      { path: "/adminchatpage", label: "Chat Service", icon: <MessageCircle size={24} /> },
      { path: "/commonemergencysos", label: "Emergency Sos", icon: <ShieldAlert size={24} /> },
      { path: "/allbookings", label: "All Booking Details", icon: <FolderOpenDot size={24} /> },
      { path: "/review", label: "Rate and Review", icon: <Star size={24} /> },
      { path: "/feedback", label: "Feedback", icon: <Send size={24} /> },
      { path: "/transport", label: "Transport Help", icon: <Car size={24} /> },
      { path: "/destinationlist", label: "Destination Listing", icon: <MapPin size={24} /> },
    ];
  }
  if (role === "TOP_LEVEL") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/topleveldashboard", label: "TOP Level Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Create Mid Level & Goverment Management", icon: <FaUserPlus size={24} /> },
      { path: "/Add_visitors", label: "All Visitors", icon: <FaUsers size={24} /> },
      { path: "/AddTemple", label: "Add Temple", icon: <MdTempleHindu size={24} /> },
      // { path: "/booking", label: "Booking", icon: <FolderOpenDot size={24} /> },
      { path: "/assignmid", label: "All Bookings & Assign midlevel", icon: <FolderOpenDot size={24} /> },
      { path: "/AddEvent", label: "Add Event", icon: <ChartColumnIncreasing size={24} /> },
      { path: "/EventList", label: "Event List", icon: <ChartColumnIncreasing size={24} /> },
      { path: "/topchatpage", label: "Chat Service", icon: <MessageCircle size={24} /> },
      { path: "/commonemergencysos", label: "Emergency Sos", icon: <ShieldAlert size={24} /> },
      { path: "/destinations", label: "Add Destination", icon: <MapPin size={24} /> },
      { path: "/govcontact", label: "GOV-Contact", icon: <MapPin size={24} /> },
      { path: "/destinationlist", label: "Destination Listing", icon: <MapPin size={24} /> },
    ];
  }
  if (role === "MID_LEVEL") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/midlevelDashboard", label: "MID Level Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Register Lower Level", icon: <FaUserPlus size={24} /> },
      { path: "/AddTemple", label: "Add Temple", icon: <MdTempleHindu size={24} /> },
      { path: "/destinations", label: "Add Destination", icon: <MapPin size={24} /> },
      { path: "/AddEvent", label: "Add Event", icon: <ChartColumnIncreasing size={24} /> },
      { path: "/EventList", label: "Event List", icon: <ChartColumnIncreasing size={24} /> },
      { path: "/assignteam", label: "Assign teamlead", icon: <FaUserCheck size={24} /> },
      { path: "/midchatpage", label: "Chat Service", icon: <MessageCircle size={24} /> },
      { path: "/allvisitorsmid", label: "All Visitors", icon: <FaUsers size={24} /> },
      { path: "/getemergencysos", label: "Emergency Sos", icon: <FaUsers size={24} /> },
      // { path: "emergencysos", label: "Emergency Sos", icon: <BarChart size={24} />},
      { path: "/transportMid", label: "Transport Help", icon: <Car size={24} /> },


    ];
  }
  if (role === "TEAM_LEADER") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/teamleaderDashboard", label: "Team Leader Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Register Support Service", icon: <FaUserPlus size={24} /> },
      { path: "/assignsupport", label: "Assign Support Service & Temple Admin", icon: <FaUserCheck size={24} /> },
      // { path: "emergencysos", label: "Emergency Sos", icon: <BarChart size={24} />},
      { path: "/teamleadchat", label: "Chat Service", icon: <MessageCircle size={24} /> },
      { path: "/poojalistingteam", label: "Pooja Listing", icon: <Star size={24} /> },
      { path: "/getemergencysos", label: "Emergency Sos", icon: <FaUsers size={24} /> },
      { path: "/transportTeam", label: "Transport Help", icon: <Car size={24} /> },
    ];
  }
  if (role === "SUPPORT_SERVICE") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      // { path: "/support", label: "Dashboard", icon: <Home size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      // { path: "/Livechat", label: "Chat Service", icon: <BarChart size={24} /> },
      { path: "/myusers", label: "My Users", icon: <BarChart size={24} /> },
      // { path: "emergencysos", label: "Emergency Sos", icon: <BarChart size={24} />},
      { path: "/supportchat", label: "Message Service", icon: <MessageCircle size={24} /> },
      { path: "/allvisitorssupport", label: "All Visitors", icon: <FaUsers size={24} /> },
      { path: "/ratereviewsupport", label: "Rate and Review", icon: <Star size={24} /> },
      { path: "/poojalisting", label: "Pooja Listing", icon: <Star size={24} /> },
      { path: "/getemergencysup", label: "Emergency Sos", icon: <FaUsers size={24} /> },
      { path: '/trasnportSupport', label: "Transport Help", icon: <Car size={24} /> },


    ];
  }
  if (role === "GOVERMENT_MANAGEMENT") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/govmanagementdashboard", label: "GOV Management Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Create Govt", icon: <FaUserPlus size={24} /> },
      { path: "/AllvisitorsManagement", label: "All Visitors", icon: <FaUserPlus size={24} /> },
      { path: "/DistrictWiseVisitors", label: "District Wise Visitors", icon: <FaUserPlus size={24} /> },
      // { path: "/domestic", label: "Domestic", icon: <FaUserPlus size={24} />},
    ];
  }
  if (role === "GOVERMENT") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/govermentdashboard", label: "GOV Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management-govt", label: "Create Temple Admin", icon: <FaUserPlus size={24} /> },
      { path: "/contactussupport", label: "Contact Us", icon: <FaUserPlus size={24} /> },
      { path: "/alldetails", label: "All Visitors", icon: <FaUserPlus size={24} /> },
    ];
  }

  if (role === "TEMPLE_ADMIN") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      { path: "/templeadmindashboard", label: "Temple Admin Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/user-management", label: "Create Guide", icon: <FaUserPlus size={24} /> },
      { path: "/assignguide", label: "Assign Guide", icon: <FaUserCheck size={24} /> },
      { path: "/allvisitorstempleadmin", label: "All Visitors", icon: <FaUsers size={24} /> },
      // { path: "emergencysos", label: "Emergency Sos", icon: <BarChart size={24} />},
      { path: "/ratereviewtempleadmin", label: "Rate and Review", icon: <Star size={24} /> },
      { path: "/blockedguide", label: "Blocked Guide List", icon: <Star size={24} /> },
      { path: "/getemergencysos", label: "Emergency Sos", icon: <FaUsers size={24} /> },
    ];
  }
  if (role === "GUIDE") {
    menuItems = [
      // { path: '/', label: "Home", icon: <Home size={24} /> },
      // { path: "/guide_dashboard", label: "Dashboard", icon: <Home size={24} /> },
      // { path: "/masterprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/mycustomers", label: "my Users", icon: <ChartColumnIncreasing size={24} /> },
      // { path: "emergencysos", label: "Emergency Sos", icon: <BarChart size={24} />},
      { path: "/ratereviewguide", label: "Rate and Review", icon: <Star size={24} /> },
      { path: "/getemergencysos", label: "Emergency Sos", icon: <FaUsers size={24} /> },
    ];
  }

  if (role === "CLIENT") {
    menuItems = [
      // { path: '/', label: "Hide Sidebar", icon: <Home size={24} /> },
      { path: '/userhome', label: "Home", icon: <Home size={24} /> },
      // { path: "/UserDashboard", label: "Dashboard", icon: <MdDashboard size={24} /> },
      // { path: "/userprofile", label: "Profile", icon: <User size={24} /> },
      { path: "/MyBooking", label: "My Booking", icon: <FolderOpen size={24} /> },
      { path: "/TempleSearch", label: "Temple Wise Search", icon: <Search size={24} /> },
      { path: "/SearchTemple", label: "District Wise Search Temple", icon: <MapPin size={24} /> },
      { path: "/PopularDestinations", label: "Popular Destinations", icon: <MapPin size={24} /> },
      // { path: "/Livechat", label: "Live Chat", icon: <MessageCircle size={24} /> },
      { path: "/membership", label: "Membership Add", icon: <User size={24} /> },
      { path: "/Emergency", label: "Emergency SOS", icon: <ShieldAlert size={24} /> },
      { path: "/TransportHelp", label: "Transport Help", icon: <Car size={24} /> },
      { path: "/WeatherAlerts", label: "Weather Checker", icon: <CloudLightning size={24} /> },
      { path: "/EventlistUser", label: "Event Notifications", icon: <Bell size={24} /> },
      { path: "/BookingUpdates", label: "Booking Updates", icon: <ClipboardList size={24} /> },
      { path: "/RateReview", label: "Rate & Review", icon: <Star size={24} /> },
      { path: "/Feedback", label: "Feedback", icon: <Send size={24} /> },
      // { path: "/guiderating", label: "Rating Guide", icon: <Star size={24} /> },
    ];

  }
  return (
<>
    <div className="fixed top-0 left-0 min-h-screen w-64 text-white bg-[#006666] z-[99] transition-transform duration-300 backimage_rem rem_desktop_sidebar">
    <div className="flex sidebar-wrapper flex-col h-full">

             <div>
                <Link to="/" className="flex items-center mt-2 space-x-2">
                  <img src="/puri-img/logo.png" alt="Logo" className="pl-4 h-18 w-14" />
                  <span className="text-md font-bold text-orange">SRI UTKAL SANSKRITI</span>
                </Link>
              </div>
      {/* Sidebar Header */}
      
      {/* <div className="flex items-center justify-between p-4 border-b border-gray-700">
       
        {role === "MASTER_ADMIN" && (
          <span className="text-xl font-bold">Master Admin</span>
        )}
        {role === "TOP_LEVEL_MANAGEMENT" && (
          <span className="text-xl font-bold">Top_Level_Management</span>
        )}
        {role === "MID_LEVEL_MANAGEMENT" && (
          <span className="text-xl font-bold">Mid_Level_Management</span>
        )}
        {role === "MID_EXECUTE_MANAGEMENT" && (
          <span className="text-xl font-bold">Mid Execute Management</span>
        )}
        {role === "LOWER_LEVEL_MANAGEMENT" && (
          <span className="text-xl font-bold">Lower_Level_Management</span>
        )}
        {role === "EXUCUTIVE_MANAGEMENT" && (
          <span className="text-xl font-bold">Exucutive_Management</span>
        )}
        {role === "LOWER_EXECUTE_MANAGEMENT" && (
          <span className="text-xl font-bold">Lower Execute Management</span>
        )}
        {role === "TOP_EXECUTE_MANAGEMENT" && (
          <span className="text-xl font-bold">Top_Execute_Management</span>
        )}
        {role === "LOWER_USER" && (
          <span className="text-xl font-bold">Lower_User</span>
        )}
        {role === "TOP_USER" && (
          <span className="text-xl font-bold">Top_User</span>
        )}
        {role === "MID_USER" && (
          <span className="text-xl font-bold">Mid_User</span>
        )}
      </div> */}

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 h-screen overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.subMenu ? (
              <div>
                {/* Parent Menu */}
                <button
                  className={`flex items-center justify-between w-full p-2 rounded-lg transition-all duration-200
                    ${activeMenuItem === item.label
                      ? "bg-white/20 font-bold text-white"
                      : "hover:bg-white/10 hover:text-white"
                    }`}
                  onClick={() => toggleSubMenu(item.label)}
                >
                  <div className="flex items-center space-x-4">
                    {item.icon}
                    <span className={isOpen ? "inline ml-[20px]" : ""}>{item.label}</span>
                  </div>
                  {isOpen && (openMenu === item.label ? <ChevronDown size={20} /> : <ChevronRight size={20} />)}
                </button>

                {/* Submenu Items */}
                {openMenu === item.label && (
                  <div className="ml-6 mt-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link
                        to={subItem.path}
                        key={subIndex}
                        className={`block p-2 rounded-lg transition-all duration-200 ${activeSubMenuItem === subItem.label
                          ? "font-bold text-[#ffaf30]"
                          : "text-gray-400 hover:text-white"
                          }`}
                        onClick={() => handleSubMenuItemClick(subItem.label, item.label)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Main Menu Item (Without Submenu)
              <Link
                to={item.path}
                className={`flex items-center p-2 gap-[12px] rounded-lg transition-all duration-200 ${activeMenuItem === item.label
                  ? "bg-white/20 text-white font-bold"
                  : "hover:bg-white/10 hover:text-white"
                  }`}
                onClick={() => handleMenuItemClick(item.label)}
              >
                {item.icon}
                <span className={isOpen ? "inline" : ""}>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
    <div className="backgroundimagerem"></div>
  </div>
    
    <aside
      className={`fixed top-0 left-0 h-full bg-[#006666] z-[999] text-white shadow-lg z-50 w-64 transform transition-transform duration-300 pointer-events-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      style={{ borderRadius: "0px 20px 20px 0px" }}
    >
      {/* {/ Menu /} */}
      <nav className="mt-8 px-4 h-screen overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            {!item.subMenu ? (
              <Link
                to={item.path}
                className="flex items-center justify-start p-2 rounded-lg hover:bg-white/10"
              >
                
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/10 focus:outline-none"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-4">{item.label}</span>
                  </div>
                  {openMenu === item.label ? <ChevronDown /> : <ChevronRight />}
                </button>

                {/* {/ Submenu items /} */}
                {openMenu === item.label && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block py-1 px-2 rounded-md hover:bg-white/10 text-sm"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
    </>
  );
};
export default Sidebar;







