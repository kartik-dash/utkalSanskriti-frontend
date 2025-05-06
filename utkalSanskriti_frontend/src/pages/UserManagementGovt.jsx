import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGovt, fetchUsergovtData, updateUser } from "../redux/thunks/userThunks";
import { fetchDistrictData, fetchDistrictwiseTemple } from "../redux/thunks/templeThunks";

const UserManagementGovt = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const UserId = useSelector((state) => state.auth?.userId);
  const users = useSelector((state) => state.user?.users || []);
  const { loading, error } = useSelector((state) => state.user || {});
  const districts = useSelector((state) => state.temple?.districts || []);
  const distTemple = useSelector((state) => state.temple?.distTemples || []);

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    const token = sessionStorage.getItem("token");
    if (token && UserId) {
      dispatch(fetchUsergovtData(UserId));
    }
    dispatch(fetchDistrictData());
  }, [dispatch, UserId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    contactNumber: "",
    password: "",
    templeId: "",
    district: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({ ...formData, district: selectedDistrict, templeId: "" });
    dispatch(fetchDistrictwiseTemple(selectedDistrict));
  };

  const handleTempleChange = (e) => setFormData({ ...formData, templeId: e.target.value });

  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resultAction;
    if (isEditMode) {
      resultAction = await dispatch(updateUser({ userId: formData.id, userData: formData }));
    } else {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
        role: formData.role,
        governmentId: UserId,
        templeId: formData.templeId,
      };
      console.log('formdataaa:', payload);
      resultAction = await dispatch(createGovt(payload));
    }

    if (resultAction?.type === createGovt.fulfilled.type || resultAction?.type === updateUser.fulfilled.type) {
      dispatch(fetchUsergovtData(UserId));
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
      templeId: "",
      district: "",
      governmentId: UserId,
    });
    setIsEditMode(false);
  };

  const handleEdit = (user) => {
    setFormData({ ...user, id: user.userId });
    setIsEditMode(true);
  };

  const handleDelete = (userId) => console.log("Delete user:", userId);

  const filteredUsers = users.filter((user) =>
    user.firstName?.toLowerCase().includes(searchQuery) || user.role?.toLowerCase().includes(searchQuery)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto whitespace-nowrap">
          {["firstName", "lastName", "email", "contactNumber", "password"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm sm:text-base capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="text-sm sm:text-base border p-2 w-full"
                required
                disabled={isEditMode && ["role", "password"].includes(field)}
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm sm:text-base">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full" required>
              <option value="">Select Role</option>
              <option value="TEMPLE_ADMIN">TEMPLE_ADMIN</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base">District</label>
            <select name="district" value={formData.district} onChange={handleDistrictChange} className="text-sm sm:text-base border p-2 w-full" required>
              <option value="">Select a District</option>
              {districts.map((district) => (
                <option key={district.name} value={district.name}>{district.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base">Temple</label>
            <select name="templeId" value={formData.templeId} onChange={handleTempleChange} className="text-sm sm:text-base border p-2 w-full" required>
              <option value="">Select a Temple</option>
              {distTemple.map((temple) => (
                <option key={temple.id} value={temple.id}>{temple.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-sm sm:text-base text-white p-2 rounded w-30">
          {isEditMode ? "Update User" : "Add User"}
        </button>
      </form>
      <input type="text" placeholder="Search users..." value={searchQuery} onChange={handleSearchChange} className="border p-2 w-70 mb-4" />
      {loading ? <p>Loading users...</p> : error ? <p className="text-red-500">Error: {error.message}</p> : (
        <>
      <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="text-sm sm:text-base bg-gray-200">
                {["ID", "First Name", "Last Name", "Role", "Email", "Contact", "District", "Temple", "Actions"].map((heading) => (
                  <th key={heading} className="text-sm sm:text-base border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.userId} className="text-center">
                  <td className="text-xs sm:text-base border p-2">{user.templeAdminId}</td>
                  <td className="text-xs sm:text-base border p-2">{user.firstName}</td>
                  <td className="text-xs sm:text-base border p-2">{user.lastName}</td>
                  <td className="text-xs sm:text-base border p-2">{user.role}</td>
                  <td className="text-xs sm:text-base border p-2">{user.email || "Unknown"}</td>
                  <td className="text-xs sm:text-base border p-2">{user.contactNumber}</td>
                  <td className="text-xs sm:text-base border p-2">{user.templeDetails?.districtName || "N/A"}</td>
                  <td className="text-xs sm:text-base border p-2">{user.templeDetails?.name || "N/A"}</td>
                  <td className="text-xs sm:text-base border p-2">
                    <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.userId)} className="bg-red-500 text-white p-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded"
            >
              Previous
            </button>
            <span className="text-sm sm:text-base">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagementGovt;
