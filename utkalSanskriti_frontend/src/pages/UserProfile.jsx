import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileData, fetchProfileServices } from "../redux/thunks/userThunks";
import { getProfileImage } from "../redux/thunks/editProfileThunks";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("profile");

  const { profileImage } = useSelector((state) => state.editprofile);
  const UserId = useSelector((state) => state.auth?.userId);

  const { userProfile, supportData, adminData, guideData, status, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (UserId) {
      dispatch(fetchUserProfileData(UserId));
      dispatch(getProfileImage(UserId));
    }
  }, [dispatch, UserId]);

  const handleSectionClick = (section) => {
    setActiveSection(section);

    if (section !== "profile") {
      dispatch(fetchProfileServices(UserId));
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:w-[650px] mx-auto bg-gradient-to-r from-blue-100 to-blue-300 py-10 my-12 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden p-6 sm:p-8 relative">
        {status === "loading" && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}

        {userProfile && (
          <>
            {/* Edit Button */}
            <Link
              to="/editprofile"
              className="absolute top-4 right-4 text-gray-600 hover:text-blue-500 flex items-center"
            >
              <FaEdit size={24} className="mr-2" />
            </Link>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-0 sm:mr-8 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                {profileImage ? (
                  <img
                    src={`data:image/png;base64,${profileImage}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Name: {userProfile.fullName || "John Doe"}
                </h2>
                <p className="text-sm text-gray-500">
                  Email: {userProfile.email || "johndoe@example.com"}
                </p>
                <p className="text-sm text-gray-500">
                  Phone No: {userProfile.contactNumber || "N/A"}
                </p>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {["support", "admin", "guide"].map((section) => (
                <button
                  key={section}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition duration-300 ${
                    activeSection === section
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handleSectionClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="mt-8">
              {activeSection === "profile" && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700">User Details</h3>
                  <p className="text-gray-600 mt-2">
                    Welcome, {userProfile.fullName}! View your account details above.
                  </p>
                </div>
              )}

              {activeSection === "support" && supportData && supportData.length > 0 && (
                <div className="space-y-4">
                  {supportData.map((support, index) => (
                    <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                        Support Service
                      </h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Temple:</strong> {support.templeName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Name:</strong> {support.supportServiceName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Email:</strong> {support.supportServiceEmail}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Contact:</strong> {support.supportServiceContact}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "admin" && adminData && adminData.length > 0 && (
                <div className="space-y-4">
                  {adminData.map((admin, index) => (
                    <div key={index} className="bg-green-100 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg sm:text-xl font-semibold text-green-700">
                        Temple Admin
                      </h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Temple:</strong> {admin.templeName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Name:</strong> {admin.templeAdminName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Email:</strong> {admin.templeAdminEmail}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Contact:</strong> {admin.templeAdminContact}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "guide" && guideData && guideData.length > 0 && (
                <div className="space-y-4">
                  {guideData.map((guide, index) => (
                    <div key={index} className="bg-purple-100 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg sm:text-xl font-semibold text-purple-700">Guide</h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Temple:</strong> {guide.templeName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Name:</strong> {guide.guideName}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Email:</strong> {guide.guideEmail}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Contact:</strong> {guide.guideContact}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
