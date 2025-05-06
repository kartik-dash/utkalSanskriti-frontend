import React, { useState, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/thunks/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { fetchEvents } from "../redux/thunks/eventThunks";
import { fetchMasterAdminProfileData } from "../redux/thunks/masteradminProfileThunks";

const Header = ({ toggleSidebar, isOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.event);
  const UserId = useSelector((state) => state.auth?.userId);
  const { masterProfile } = useSelector((state) => state.masterProfile);

  useEffect(() => {
    if (UserId) {
      dispatch(fetchMasterAdminProfileData(UserId));
    }
  }, [dispatch, UserId]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleLogout = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(logoutUser(token))
        .then(() => {
          sessionStorage.clear();
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    }
  };
  return (
    <header className="w-full sticky top-0 left-0 right-0 z-50 px-6 py-4 bg-white shadow-md">
      <div className="flex items-center justify-end">
        {/* <div>
          <Link to="/" className="flex items-center space-x-2">
            <img src="/puri-img/logo.png" alt="Logo" className="h-24 w-20" />
            <span className="text-xl font-bold text-orange">SRI UTKAL SANSKRITIsanstanam</span>
          </Link>
        </div> */}
        
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            {masterProfile && (
              <span className="text-white px-4 py-2 bg-gradient-to-r mr-6 from-blue-500 text-xs sm:text-md to-purple-600 rounded-md hover:bg-white/20 transition-colors">
                {masterProfile.fullName.toUpperCase()}
              </span>
            )}
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <Bell size={24} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg py-2">
                {events && events.length > 0 ? (
                  events.map((note, index) => (
                    <div key={index} className="px-4 py-2">
                      <button
                        onClick={() =>
                          setExpandedNotification(expandedNotification === index ? null : index)
                        }
                        className="block w-full text-left text-gray-700 font-bold"
                      >
                        📍 {note.location}
                      </button>
                      {expandedNotification === index && (
                        <p className="text-xs text-gray-500 mt-1">
                        {note.description}  
                        <Link to="/EventlistUser" className="text-blue-600 font-semibold ml-1 hover:underline">
                          KNOW MORE
                        </Link>
                      </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No notifications</p>
                )}
              </div>
            )}
          </div>
          
          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="flex items-center justify-center p-1 bg-sky-500 rounded-full">
                <User size={30} className="text-white" />
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-48 w-48 bg-white border rounded-lg shadow-lg py-2">
                <Link to="/userprofile" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                 Profile
                </Link>
                <Link to="/settings" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout <LogOut size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;