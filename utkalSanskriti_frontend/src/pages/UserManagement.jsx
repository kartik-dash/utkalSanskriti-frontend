import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { createUser, fetchUserData, updateUser } from "../redux/thunks/userThunks";

const UserManagement = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const UserId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.user?.users);
  const { loading, error } = useSelector((state) => state.user || {});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("User Role:", decodedToken.role); // Log role directly
        setRole(decodedToken.role); // Set role state
        if (UserId) dispatch(fetchUserData(UserId)); // Fetch users if UserId exists
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch, UserId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    contactNumber: "",
    password: "",
  });

  const getAvailableRoles = () => {
    if (role === "MASTER_ADMIN") return ["ADMIN"];
    if (role === "ADMIN") return ["TOP_LEVEL"];
    if (role === "TOP_LEVEL") return ["MID_LEVEL", "GOVERMENT_MANAGEMENT"];
    if (role==="MID_LEVEL") return["TEAM_LEADER"];
    if (role==="GOVERMENT_MANAGEMENT") return["GOVERMENT"];
    if (role==="TEAM_LEADER") return["SUPPORT_SERVICE"];
    if (role==="GOVERMENT") return["TEMPLE_ADMIN"];
    if (role==="TEMPLE_ADMIN") return["GUIDE"];
    return [];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      const resultAction = await dispatch(
        updateUser({
          userId: formData.id,
          userData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            contactNumber: formData.contactNumber,
          },
        })
      );
      if (updateUser.fulfilled.match(resultAction)) dispatch(fetchUserData(UserId));
    } else {
      const resultAction = await dispatch(createUser(formData));
      if (createUser.fulfilled.match(resultAction)) dispatch(fetchUserData(UserId));
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      contactNumber: "",
      password: "",
      id: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      id: user.userId,
    });
    setIsEditMode(true);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) =>
    user.firstName?.toLowerCase().includes(searchQuery) ||
    user.role?.toLowerCase().includes(searchQuery)
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{isEditMode ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="user-sec whitespace-nowrap">
          {["firstName", "lastName", "email", "contactNumber", "password"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm sm:text-base capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="text-sm sm:text-base border p-2 w-full"
                required
                disabled={isEditMode && field === "password"}
              />
            </div>
          ))}

          {/* Role Dropdown */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="text-sm sm:text-base border p-2 w-full"
              required
              disabled={isEditMode}
            >
              <option value="">Select Role</option>
              {getAvailableRoles().map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white text-sm sm:text-base p-2 rounded w-30">
          {isEditMode ? "Update User" : "Add User"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 w-70 mb-4"
      />

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">
          Error: {error.message ? error.message : "An unknown error occurred."}
        </p>
      ) : (
        <>
      <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200">
                {["ID", "First Name", "Last Name", "Role", "Email", "Contact No", "Actions"].map((heading) => (
                  <th key={heading} className="text-sm sm:text-base border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.userId} className="text-center">
                    <td className="text-xs sm:text-base border p-2">{user.userId}</td>
                    <td className="text-xs sm:text-base border p-2">{user.firstName}</td>
                    <td className="text-xs sm:text-base border p-2">{user.lastName}</td>
                    <td className="text-xs sm:text-base border p-2">{user.role}</td>
                    <td className="text-xs sm:text-base border p-2">{user.email || "Unknown"}</td>
                    <td className="text-xs sm:text-base border p-2">{user.contactNumber}</td>
                    <td className="text-xs sm:text-base border p-2">
                      <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                      {/* <button className="bg-red-500 text-white p-2 rounded">Delete</button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border p-2 text-center text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded">Previous</button>
            <span className="text-sm sm:text-base">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
