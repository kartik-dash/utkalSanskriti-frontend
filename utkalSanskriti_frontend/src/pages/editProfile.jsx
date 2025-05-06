import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEditProfile,
  verifyMobileChange,
  requestMobileChange,
  updateProfileImage,
  getProfileImage,
} from "../redux/thunks/editProfileThunks";
import { fetchMasterAdminProfileData } from "../redux/thunks/masteradminProfileThunks";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.userId);
  const { masterProfile } = useSelector((state) => state.masterProfile);
  // const { editprofile } = useSelector((state) => state.editprofile);
  const { profileImage } = useSelector((state) => state.editprofile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [newMobile, setNewMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  console.log('preview:', profileImage);

  // Fetch profile info
  useEffect(() => {
    if (userId) {
      dispatch(fetchMasterAdminProfileData(userId));
      // dispatch(getProfileImage(userId));
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (userId) {
      // dispatch(fetchMasterAdminProfileData(userId));
      dispatch(getProfileImage(userId));
    }
  }, [dispatch, userId]);
  // Set initial form values
  useEffect(() => {
    if (masterProfile) {
      const fullName = masterProfile.fullName?.trim().split(" ") || [];
      const firstName = fullName[0] || masterProfile.firstName || "";
      const lastName = fullName.slice(1).join(" ") || masterProfile.lastName || "";

      setFormData({
        firstName,
        lastName,
        email: masterProfile.email || "",
        contactNumber: masterProfile.contactNumber || "",
      });

      if (masterProfile.profileImage) {
        setPreviewImage(masterProfile.profileImage);
      }
    }
  }, [masterProfile]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (formData.firstName.length < 2) newErrors.firstName = "At least 2 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (formData.lastName.length < 2) newErrors.lastName = "At least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    else if (!phoneRegex.test(formData.contactNumber)) newErrors.contactNumber = "10-digit required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
  
      const formData = new FormData();
      formData.append("file", file);
  
      const resultAction = await dispatch(updateProfileImage({ userId, formData }));
  
      if (updateProfileImage.fulfilled.match(resultAction)) {
        // Only call if previous was successful
        await dispatch(getProfileImage(userId));
      } else {
        console.error("Image update failed:", resultAction.error);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (profileImageFile) data.append("profileImage", profileImageFile);

    const result = await dispatch(updateEditProfile({ userId, formData: data }));
    alert(result.meta.requestStatus === "fulfilled"
      ? "Profile updated successfully!"
      : "Failed to update profile.");
  };

  const handleRequestOtp = async () => {
    if (!/^[0-9]{10}$/.test(newMobile)) {
      setErrors((prev) => ({ ...prev, newMobile: "Enter valid 10-digit number" }));
      return;
    }

    const result = await dispatch(requestMobileChange({
      email: formData.email,
      newMobileNumber: newMobile,
    }));

    if (result.meta.requestStatus === "fulfilled") {
      setShowOtpField(true);
      alert("OTP sent to your email!");
    } else {
      alert("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    const result = await dispatch(verifyMobileChange({
      email: formData.email,
      otp,
      newMobileNumber: newMobile,
    }));

    if (result.meta.requestStatus === "fulfilled") {
      setFormData((prev) => ({ ...prev, contactNumber: newMobile }));
      setNewMobile("");
      setOtp("");
      setShowOtpField(false);
      alert("Mobile number updated!");
    } else {
      alert("OTP verification failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Profile</h2>

        {/* Profile Image */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {profileImage && (
            <img src={`data:image/png;base64,${profileImage}`} alt="Preview" className="w-24 h-24 rounded-full mt-3 object-cover" />
          )}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 w-full rounded-lg"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 w-full rounded-lg"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="border p-2 w-full rounded-lg bg-gray-100 cursor-not-allowed"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">
            Save Changes
          </button>
        </form>

        {/* Mobile Update */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Change Mobile Number</h3>

          <input
            type="tel"
            value={newMobile}
            onChange={(e) => {
              setNewMobile(e.target.value);
              setErrors((prev) => ({ ...prev, newMobile: "" }));
            }}
            placeholder="New Mobile Number"
            className="border p-2 w-full rounded-lg"
          />
          {errors.newMobile && <p className="text-red-500 text-sm">{errors.newMobile}</p>}

          <button onClick={handleRequestOtp} className="w-full bg-green-500 text-white p-3 rounded-lg mt-2">
            Send OTP to Email
          </button>

          {showOtpField && (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrors((prev) => ({ ...prev, otp: "" }));
                }}
                placeholder="Enter OTP"
                className="border p-2 w-full rounded-lg mt-2"
              />
              {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

              <button onClick={handleVerifyOtp} className="w-full bg-purple-500 text-white p-3 rounded-lg mt-2">
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
