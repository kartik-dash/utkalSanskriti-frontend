
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/thunks/authThunks"; // import your thunk
// import { useNavigate, Link } from "react-router-dom";
// import logo from "../assets/logo/only-logo.png"

// const Signin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, status, role } = useSelector((state) => state.auth); // Extract loading, error, and status states

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [flashMessage, setFlashMessage] = useState(""); // For storing flash message

//   useEffect(() => {
//     if (status === 'succeeded') {
//       if (role === 'MASTER_ADMIN') {
//         navigate('/masteradmin_dashboard');
//       } else if (role === 'ADMIN') {
//         navigate('/admindashboard');
//       } else if (role === 'TOP_LEVEL') {
//         navigate('/topleveldashboard');
//       } else if (role === 'MID_LEVEL') {
//         navigate('/midlevelDashboard');
//       } else if (role === 'GOVERMENT_MANAGEMENT') {
//         navigate('/govmanagementdashboard');
//       } else if (role === 'TEAM_LEADER') {
//         navigate('/teamleaderDashboard');
//       } else if (role === 'SUPPORT_SERVICE') {
//         navigate('/masterprofile');
//       } else if (role === 'GOVERMENT') {
//         navigate('/govermentdashboard');
//       } else if (role === 'TEMPLE_ADMIN') {
//         navigate('/templeadmindashboard');
//       } else if (role === 'GUIDE') {
//         navigate('/masterprofile');
//       } else if (role === 'CLIENT') {
//         navigate('/userhome');
//       }
//     }
//   }, [status, role, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData)); // Dispatch the signIn action with form data
//   };

//   useEffect(() => {
//     if (error) {
//       const errorMessage = error?.message || "Something went wrong. Please try again.";
//       setFlashMessage(errorMessage);
//       setTimeout(() => setFlashMessage(""), 3000);
//     }
//   }, [error]);

//   return (
//     <main className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-[200px]">
//       <div className="bg-white pt-8 pl-16 pr-16 pb-8 rounded-lg shadow-md w-96">
//         <img className="h-28 w-24 mx-auto" src={logo} alt="Logo" />
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <InputBox type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <InputBox type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//           {flashMessage && <div className="text-red-500 mb-4 text-center">{flashMessage}</div>}
//           <div className="mb-6">
//             <input
//               type="submit"
//               value={loading ? "Signing In..." : "Sign In"}
//               className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
//               disabled={loading}
//             />
//           </div>
//           <div className="flex justify-center text-sm text-gray-600">
          
//             <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
//           </div>
//           <p className="text-center mt-4">
//             Not a user?{' '}
//             <Link to="/registration" className="text-blue-500 hover:underline">Register HERE</Link>
//           </p>
//         </form>
//       </div>
//     </main>
//   );
// };

// const InputBox = ({ type, placeholder, name, value, onChange }) => {
//   return (
//     <div className="mb-6">
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
//       />
//     </div>
//   );
// };

// export default Signin;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/authThunks"; // import your thunk
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo/only-logo.png";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, status, role } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const [flashMessage, setFlashMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  useEffect(() => {
    if (status === "succeeded") {
      setShowPopup(true); // Show success popup
      setTimeout(() => {
        setShowPopup(false);
        redirectUser(); // Redirect after popup disappears
      }, 2000);
    }
  }, [status, role]);

  const redirectUser = () => {
    const routes = {
      MASTER_ADMIN: "/masteradmin_dashboard",
      ADMIN: "/admindashboard",
      TOP_LEVEL: "/topleveldashboard",
      MID_LEVEL: "/midlevelDashboard",
      GOVERMENT_MANAGEMENT: "/govmanagementdashboard",
      TEAM_LEADER: "/teamleaderDashboard",
      SUPPORT_SERVICE: "/masterprofile",
      GOVERMENT: "/govermentdashboard",
      TEMPLE_ADMIN: "/templeadmindashboard",
      GUIDE: "/masterprofile",
      CLIENT: "/userhome",
      // CLIENT: "/",
    };
    navigate(routes[role] || "/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      setFlashMessage(error?.message || "Something went wrong. Please try again.");
      setTimeout(() => setFlashMessage(""), 3000);
    }
  }, [error]);

  return (
    <main className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-[200px] relative">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-500">
          ✅ Login Successful!
        </div>
      )}

      <div className="bg-white p-4 sm:pt-8 pr-6 sm:pl-16 sm:pr-16 pb-4 sm:pb-8 rounded-lg shadow-md w-80 sm:w-96">
        <img className="h-18 w-14 sm:h-28 sm:w-24 mx-auto" src={logo} alt="Logo" />
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputBox type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <InputBox type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          
          {/* Error Message */}
          {flashMessage && <div className="text-red-500 mb-4 text-center">{flashMessage}</div>}

          <div className="mb-6">
            <input
              type="submit"
              value={loading ? "Signing In..." : "Sign In"}
              className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
              disabled={loading}
            />
          </div>
          
          <div className="flex justify-center text-sm text-gray-600">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <p className="text-center mt-2 sm:mt-4">
            Not a user?{" "}
            <Link to="/registration" className="text-blue-500 hover:underline">Register HERE</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};

export default Signin;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/thunks/authThunks"; // import your thunk
// import { useNavigate, Link } from "react-router-dom";
// import logo from "../assets/logo/only-logo.png";

// const Signin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, status, role, token } = useSelector((state) => state.auth); // Check token in Redux state

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [flashMessage, setFlashMessage] = useState("");

//   // 🔹 Redirect if token exists (User is already logged in)
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token"); // Check token in localStorage
//     if (token || storedToken) {
//       navigate("/"); // Redirect to home or dashboard
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     if (status === "succeeded") {
//       localStorage.setItem("token", token); // Store token after login success
//       if (role === "MASTER_ADMIN") navigate("/masteradmin_dashboard");
//       else if (role === "ADMIN") navigate("/admindashboard");
//       else if (role === "TOP_LEVEL") navigate("/topleveldashboard");
//       else if (role === "MID_LEVEL") navigate("/midlevelDashboard");
//       else if (role === "GOVERMENT_MANAGEMENT") navigate("/govmanagementdashboard");
//       else if (role === "TEAM_LEADER") navigate("/teamleaderDashboard");
//       else if (role === "SUPPORT_SERVICE") navigate("/masterprofile");
//       else if (role === "GOVERMENT") navigate("/govermentdashboard");
//       else if (role === "TEMPLE_ADMIN") navigate("/templeadmindashboard");
//       else if (role === "GUIDE") navigate("/masterprofile");
//       else if (role === "CLIENT") navigate("/");
//     }
//   }, [status, role, token, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//   };

//   useEffect(() => {
//     if (error) {
//       const errorMessage = error?.message || "Something went wrong. Please try again.";
//       setFlashMessage(errorMessage);
//       setTimeout(() => setFlashMessage(""), 3000);
//     }
//   }, [error]);

//   return (
//     <main className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-[200px]">
//       <div className="bg-white pt-8 pl-16 pr-16 pb-8 rounded-lg shadow-md w-96">
//         <img className="h-28 w-24 mx-auto" src={logo} alt="Logo" />
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <InputBox type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <InputBox type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//           {flashMessage && <div className="text-red-500 mb-4 text-center">{flashMessage}</div>}
//           <div className="mb-6">
//             <input
//               type="submit"
//               value={loading ? "Signing In..." : "Sign In"}
//               className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
//               disabled={loading}
//             />
//           </div>
//           <div className="flex justify-center text-sm text-gray-600">
//             <Link to="/forgot-password" className="text-blue-500 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>
//           <p className="text-center mt-4">
//             Not a user? <Link to="/registration" className="text-blue-500 hover:underline">Register HERE</Link>
//           </p>
//         </form>
//       </div>
//     </main>
//   );
// };

// const InputBox = ({ type, placeholder, name, value, onChange }) => {
//   return (
//     <div className="mb-6">
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
//       />
//     </div>
//   );
// };

// export default Signin;

