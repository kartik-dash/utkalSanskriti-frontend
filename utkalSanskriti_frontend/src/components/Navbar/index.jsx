
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import ExploreUtkal from "../Explore/ExploreUtkal";
// import { logoutUser } from '../../redux/thunks/authThunks';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMasterAdminProfileData } from "../../redux/thunks/masteradminProfileThunks";

// export default function Navbar(props) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isExploreOpen, setIsExploreOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Track dropdown visibility
//   const navigate = useNavigate(); // For navigation after logout
//   const dispatch = useDispatch();

//   const UserId = useSelector((state) => state.auth?.userId);
//   const { masterProfile } = useSelector((state) => state.masterProfile);

  

//   useEffect(() => {
//       if (UserId) {
//         dispatch(fetchMasterAdminProfileData(UserId));
//       }
//     }, [dispatch, UserId]);



//   // Get the current location (route)
//   const location = useLocation();

//   // Check if the current route is the landing page
//   const isLandingPage = location.pathname === "/";

//   // Close the mobile menu when the route changes
//   useEffect(() => {
//     setIsOpen(false); // Close the menu when route changes

//     // Check if the token exists in sessionStorage
//     const token = sessionStorage.getItem("token");
//     setIsLoggedIn(!!token); // If a token exists, set isLoggedIn to true
//   }, [location]);


//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       navigate("/"); // Redirect logged-in users to dashboard
//     }
//   }, []);

//   // Handle logout
//   // const handleLogout = () => {
//   //   sessionStorage.removeItem("token"); // Clear token
//   //   setIsLoggedIn(false); // Update state
//   //   navigate("/login"); // Redirect to login page
//   // };

//   const handleLogout = () => {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         dispatch(logoutUser(token))
//           .then(() => {
//             sessionStorage.clear();
//             console.log('User logged out. Redirecting to /login');
//             window.location.href = '/login';
//           })
//           .catch((error) => {
//             console.error('Logout failed:', error);
//           });
//       }
//     };

//   return (
//     <nav
//       className={`fixed top-0 z-50 w-full ${isLandingPage ? "bg-transparent" : "bg-black"
//         } flex `}
//     >
//       <div className="container w-full flex justify-between py-2">
//         <div className="flex items-center h-20">
//           {/* {/ Left side - Logo and Name /} */}
//           <div className="">
//             <Link to="/" className="flex items-center space-x-2">
//               <img
//                 src={"/puri-img/logo.png"}
//                 alt="Logo"
//                 className="h-14 w-10 sm:h-24 sm:w-20" // Adjust size as needed
//               />
//               <span className="text-md sm:text-xl font-bold text-orange">
//                 SRI UTKAL SANSKRITI
//               </span>
//             </Link>
//           </div>
//         </div>
//         {/* {/ Right side - Desktop Profile/Login and Mobile Menu Button /} */}
//         <div className="flex gap-4 items-center">
//           {/* Show Profile button if logged in, otherwise show Login button */}
//           {isLoggedIn ? (
//             <div className="block relative">
//               <button
//                 onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                 className="text-white text-xs sm:text-base px-2 sm:px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:bg-white/20 transition-colors"
//               >
//                 {masterProfile?.fullName ? masterProfile.fullName.toUpperCase() : "Guest"}
//               </button>

//               {/* Dropdown menu */}
//               {isProfileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg z-10">
//                   <ul className="py-2">
//                     <li>
//                       <Link
//                         to="/userhome"
//                         className="block px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors"
//                       >
//                         My Dashboard
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors text-left"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             // <div className="hidden block">
//             //   <Link
//             //     to="/login"
//             //     className="text-white px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:bg-white/20 transition-colors"
//             //   >
//             //     Login
//             //   </Link>
//             // </div>

//             <div className="block">
//               <Link
//                 to="/login"
//                 className="text-white text-xs sm:text-base px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:bg-white/20 transition-colors"
//               >
//                 Login
//               </Link>
//             </div>
//           )}

//           {/* {/ Hamburger Menu Button (Mobile) /} */}
//           <div className="flex items-center bg-white rounded-md">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-orange hover:bg-white/20 p-0 sm:p-2 rounded-md focus:outline-none"
//               aria-label="Open in Elements"
//             >
//               <svg
//                 className="h-5 w-8 sm:h-8"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* {/ Mobile Menu /} */}
//       {isOpen && (
//           <div className="absolute right-0 mt-20 w-60 max-w-[90vw] sm:w-40 md:w-96 bg-black backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all">
//           <div className="flex flex-col ">
//             <Link to="/" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               Back To HOME
//             </Link>
//             <div>
//               <div
//                 onClick={() => setIsExploreOpen(!isExploreOpen)} // Fixed this
//                 className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
//               >
//                 Explore Utkal-Pradesh
//               </div>
//               {isExploreOpen && (
//                 <div className="bg-gray-800 p-4 rounded-lg">
//                   <ExploreUtkal />
//                 </div>
//               )}
//             </div>
//             <Link to="/aboutUtkalSanskriti" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               About Utkal Sanskriti
//             </Link>
//             <Link to="/heritageSites" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               Heritages
//             </Link>
//             <Link to="/history" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               History of Odisha
//             </Link>
//             <Link to="/contact" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               Contact
//             </Link>
//             <Link to="/about" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               About
//             </Link>
//             <Link to="/culture" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               Culture
//             </Link>
//             <Link to="/blog" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
//               blog
//             </Link>        
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }




import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExploreUtkal from "../Explore/ExploreUtkal";
import { logoutUser } from '../../redux/thunks/authThunks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMasterAdminProfileData } from "../../redux/thunks/masteradminProfileThunks";

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserId = useSelector((state) => state.auth?.userId);
  const { masterProfile } = useSelector((state) => state.masterProfile);

  useEffect(() => {
    if (UserId) {
      dispatch(fetchMasterAdminProfileData(UserId));
    }
  }, [dispatch, UserId]);

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    setIsOpen(false);
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(logoutUser(token))
        .then(() => {
          sessionStorage.clear();
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full ${isLandingPage ? "bg-transparent" : "bg-black"} flex`}>
      <div className="container w-full flex justify-between py-2">
        <div className="flex items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={"/puri-img/logo.png"}
              alt="Logo"
              className="h-14 w-10 sm:h-24 sm:w-20"
            />
            <span className="text-md sm:text-xl font-bold text-orange">
              SRI UTKAL SANSKRITI
            </span>
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <div className="block relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="text-white text-xs sm:text-base px-2 sm:px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:bg-white/20 transition-colors"
              >
                {masterProfile?.fullName ? masterProfile.fullName.toUpperCase() : "Guest"}
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/userhome"
                        className="block px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors"
                      >
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="block">
              <Link
                to="/login"
                className="text-white text-xs sm:text-base px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:bg-white/20 transition-colors"
              >
                Login
              </Link>
            </div>
          )}

          <div className="flex items-center bg-white rounded-md">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-orange hover:bg-white/20 p-0 sm:p-2 rounded-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-5 w-8 sm:h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`absolute right-0 mt-20 w-60 max-w-[90vw] sm:w-40 md:w-96 bg-black backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col">
          <Link to="/" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            Back To HOME
          </Link>
          <div>
            <div
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
            >
              Explore Utkal-Pradesh
            </div>
            {isExploreOpen && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <ExploreUtkal />
              </div>
            )}
          </div>
          <Link to="/aboutUtkalSanskriti" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            About Utkal Sanskriti
          </Link>
          <Link to="/heritageSites" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            Heritages
          </Link>
          <Link to="/history" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            History of Odisha
          </Link>
          <Link to="/contact" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            Contact
          </Link>
          <Link to="/about" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            About
          </Link>
          <Link to="/culture" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            Culture
          </Link>
          <Link to="/blog" className="text-sm sm:text-base px-4 py-2 text-white hover:bg-gray-600 rounded-md transition-colors">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
