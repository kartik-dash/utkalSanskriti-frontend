import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { createClient } from "../redux/thunks/clientThunks";
import { verifyRegisterOtp } from "../redux/thunks/verifyotpThunks";
import logo from "../assets/logo/only-logo.png";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, status } = useSelector((state) => state.client);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [flashMessage, setFlashMessage] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      setFlashMessage(error?.message || "Something went wrong. Please try again.");
      setTimeout(() => setFlashMessage(""), 3000);
    }
  }, [error, status]);

  const onSubmit = (data) => {
    setEmail(data.email);
    dispatch(createClient(data));
    setOtpModalVisible(true);
  };

  const handleOtpSubmit = () => {
    if (!/^\d{6}$/.test(otp)) {
      alert("OTP must be a 6-digit number.");
      return;
    }

    dispatch(verifyRegisterOtp({ email, otp }))
      .unwrap()
      .then(() => {
        alert("OTP Verified! Registration successful.");
        setOtpModalVisible(false);
        navigate('/login');
      })
      .catch(() => {
        alert("Invalid OTP, please try again.");
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="w-full sm:w-[500px] mt-20 max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center">
          <img className="h-18 w-14 sm:h-28 sm:w-24 mb-4" src={logo} alt="Logo" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">User Registration</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              type="text"
              {...register('firstName', { required: 'First Name is required' })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last Name is required' })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
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

          {/* Country */}
          <div>
              <label className="block text-sm font-medium text-gray-600">Country Name</label>
              <input
                type="text"
                list="country-list"
                {...register('country', {
                  required: 'Country is required',
                })}
                className={`w-full mt-2 p-2 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <datalist id="country-list">
                {[
                  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
                  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
                  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
                  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
                  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba",
                  "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)",
                  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
                  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
                  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
                  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
                  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
                  "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
                  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
                  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
                  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
                  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
                  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
                  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
                  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
                  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
                  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                ].map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
              {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>
          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact Number</label>
            <input
              type="tel"
              {...register('contactNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                }
              })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
          </div>

          {/* Hidden Designation */}
          <div className="hidden">
            <label className="block text-sm font-medium text-gray-600">Designation</label>
            <select
              {...register('role', { required: 'Please select your designation' })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="CLIENT">Client</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Must be at least 6 characters' },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Must include at least one letter & one number',
                }
              })}
              className={`w-full mt-2 p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Registering..." : "Verify OTP"}
            </button>
          </div>
        </form>

        {flashMessage && <p className="mt-4 text-center text-sm text-red-500">{flashMessage}</p>}
      </div>

      {/* OTP Modal */}
      {otpModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-md text-lg"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition duration-300"
            >
              Submit OTP
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default RegistrationPage;
