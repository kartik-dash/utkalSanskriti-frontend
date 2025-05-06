
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changePassword } from "../redux/thunks/settingsPageThunks";
// import { forgotPassword } from "../redux/thunks/forgotPasswordThunks";

// const SettingsPage = () => {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.change);

//   const [activeTab, setActiveTab] = useState("password");
//   const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password fields
//   const [loading, setLoading] = useState(false); // Loading state for OTP request
//   const [formData, setFormData] = useState({
//     email: "",
//     oldPassword: "",
//     otp: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Validate Email
//   const validateEmail = () => {
//     if (!formData.email.trim()) {
//       setErrors({ email: "Email is required" });
//       return false;
//     }
//     setErrors({});
//     return true;
//   };

//   // Send OTP
//   const handleSendOTP = async () => {
//     if (!validateEmail()) return;
    
//     setLoading(true);
//     try {
//       const response = await dispatch(forgotPassword({ email: formData.email })).unwrap();
//       if (response) {
//         setStep(2); // Move to the next step only if successful
//       }
//     } catch (err) {
//       setErrors({ email: err.message || "Failed to send OTP. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Validate Password Form
//   const validatePasswordForm = () => {
//     let newErrors = {};
//     if (!formData.oldPassword.trim()) {
//       newErrors.oldPassword = "Old password is required";
//     }
//     if (!formData.otp.trim()) {
//       newErrors.otp = "OTP is required";
//     }
//     if (!formData.newPassword.trim()) {
//       newErrors.newPassword = "New password is required";
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = "Password must be at least 6 characters";
//     }
//     if (formData.newPassword !== formData.confirmNewPassword) {
//       newErrors.confirmNewPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Password Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validatePasswordForm()) return;
//     dispatch(changePassword(formData));
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 mt-6 bg-white shadow-md p-5">
//         <h2 className="text-xl font-semibold mb-5">Settings</h2>
//         <ul className="space-y-2">
//           <li
//             className={`p-2 rounded cursor-pointer transition duration-200 ${
//               activeTab === "password" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
//             }`}
//             onClick={() => setActiveTab("password")}
//           >
//             Change Password
//           </li>
//         </ul>
//       </aside>

//       {/* Content */}
//       <div className="flex justify-center mt-6 mx-auto h-screen">
//       <main className="w-[520px] h-fit p-8 bg-white shadow-md rounded-lg">
//   {activeTab === "password" && (
//     <div>
//       <h2 className="text-2xl font-semibold mb-5">Change Password</h2>

//       {/* Step 1: Enter Email */}
//       {step === 1 && (
//         <form className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
//           <button
//             type="button"
//             onClick={handleSendOTP}
//             className="w-full bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       )}

//       {/* Step 2: Password Fields */}
//       {step === 2 && (
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Old Password */}
//           <div>
//             <label className="block text-gray-700 font-medium">Old Password</label>
//             <input
//               type="password"
//               name="oldPassword"
//               value={formData.oldPassword}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//             {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
//           </div>

//           {/* OTP */}
//           <div>
//             <label className="block text-gray-700 font-medium">OTP</label>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//             {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
//           </div>

//           {/* New Password */}
//           <div>
//             <label className="block text-gray-700 font-medium">New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//             {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
//           </div>

//           {/* Confirm New Password */}
//           <div>
//             <label className="block text-gray-700 font-medium">Confirm New Password</label>
//             <input
//               type="password"
//               name="confirmNewPassword"
//               value={formData.confirmNewPassword}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//               required
//             />
//             {errors.confirmNewPassword && (
//               <p className="text-red-500 text-sm">{errors.confirmNewPassword}</p>
//             )}
//           </div>

//           {/* API Status Message */}
//           {error && <p className="text-red-500">{error}</p>}
//           {status === "succeeded" && <p className="text-green-500">Password changed successfully!</p>}

//           {/* Buttons */}
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
//               onClick={() => setStep(1)}
//             >
//               Back
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   )}
// </main>

//       </div>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/thunks/settingsPageThunks";
import { forgotPassword } from "../redux/thunks/forgotPasswordThunks";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.change);

  const [activeTab, setActiveTab] = useState("password");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password fields
  const [loading, setLoading] = useState(false); // Loading state for OTP request
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Email
  const validateEmail = () => {
    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return false;
    }
    setErrors({});
    return true;
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!validateEmail()) return;
    
    setLoading(true);
    try {
      const response = await dispatch(forgotPassword({ email: formData.email })).unwrap();
      if (response) {
        setStep(2); // Move to the next step only if successful
      }
    } catch (err) {
      setErrors({ email: err.message || "Failed to send OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Validate Password Form
  const validatePasswordForm = () => {
    let newErrors = {};
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = "Old password is required";
    }
    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Password Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    dispatch(changePassword(formData));
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="md:w-64 mt-6 bg-white shadow-md m-4 p-5 md:p-8">
        <h2 className="text-xl font-semibold mb-5">Settings</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 rounded cursor-pointer transition duration-200 ${
              activeTab === "password" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </li>
        </ul>
      </aside>

      {/* Content */}
      <div className="flex justify-center mt-6 mx-auto h-auto md:h-screen w-full px-4">
        <main className="w-[500px] h-[300px] max-w-2xl p-8 bg-white shadow-md rounded-lg">
          {activeTab === "password" && (
            <div>
              <h2 className="text-2xl font-semibold mb-5">Change Password</h2>

              {/* Step 1: Enter Email */}
              {step === 1 && (
                <form className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              )}

              {/* Step 2: Password Fields */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Old Password */}
                  <div>
                    <label className="block text-gray-700 font-medium">Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    />
                    {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
                  </div>

                  {/* OTP */}
                  <div>
                    <label className="block text-gray-700 font-medium">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    />
                    {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-gray-700 font-medium">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-gray-700 font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                      required
                    />
                    {errors.confirmNewPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmNewPassword}</p>
                    )}
                  </div>

                  {/* API Status Message */}
                  {error && <p className="text-red-500">{error}</p>}
                  {status === "succeeded" && <p className="text-green-500">Password changed successfully!</p>}

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
