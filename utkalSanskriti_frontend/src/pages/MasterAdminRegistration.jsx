import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { createUser } from "../redux/thunks/userThunks";
import logo from "../assets/logo/only-logo.png";


const MasterAdminRegistration = () => {

  const dispatch = useDispatch();
  const { loading, error, status } = useSelector((state) => state.user); // Extract loading, error, and status from redux store
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [flashMessage, setFlashMessage] = useState(""); // For storing flash message

  // Display flash message if there is any error or success
  useEffect(() => {
    if (error) {
      const errorMessage = error?.message || "Something went wrong. Please try again.";
      setFlashMessage(errorMessage);
      setTimeout(() => setFlashMessage(""), 3000); // Clear message after 3 seconds
    }

    if (status === 'succeeded') {
      setFlashMessage("Registration successful!"); // Success message
      setTimeout(() => {
        // You can navigate to another page or clear the form here
      }, 3000);
    }
  }, [error, status]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
    dispatch(createUser(data)); // Dispatch the action with the form data
  };

  return (
    <main className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-[200px]">
      <div className="flex items-center justify-center rounded-lg bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <img className="h-28 w-24 mx-auto" src={logo} alt="Logo" />
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Master Admin Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', { required: 'Full Name is required' })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'Last Name is required' })}
                className={`w-full mt-2 p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                }
              })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              id="contactNumber"
              type="tel"
              {...register('contactNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                }
              })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: "Please select your designation" })}
                  defaultValue="MASTER_ADMIN"
                  className={`w-full mt-2 p-2 border rounded-md ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="MASTER_ADMIN">Master Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
              })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          {/* Submit Button */}
          <div className="col-span-2">
            <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {flashMessage && (
          <div className="mt-4 text-center text-sm text-red-500">
            {flashMessage}
          </div>
        )}
      </div>
    </div>
    </main>
  )
}

export default MasterAdminRegistration;

