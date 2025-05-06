import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTemple, fetchTempleData, updateTemple } from "../redux/thunks/templeThunks";
import { odishaDistricts } from "../assets/0dishaDistrict_asset";

const AddTemple = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const userId = useSelector((state) => state.auth.userId);
  const { temples = [], loading, error } = useSelector((state) => state.temple || {});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [templeBeingEdited, setTempleBeingEdited] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    districtName: "",
    photo: "",
    id: null,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchTempleData(userId));
    }
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleDistrictChange = (e) => {
    setFormData({ ...formData, districtName: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      description: "",
      districtName: "",
      photo: "",
      id: null,
    });
    setIsEditMode(false);
    setTempleBeingEdited(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("districtName", formData.districtName);
  
    if (formData.photo instanceof File) {
      formDataToSend.append("image", formData.photo);
    }
  
    // 🔍 Log the FormData contents
    console.log("=== Data being sent ===");
    for (let [key, value] of formDataToSend.entries()) {
      if (key === "image" && value instanceof File) {
        console.log(key, value.name); // Just log filename for image
      } else {
        console.log(key, value);
      }
    }
  
    let resultAction;
    if (isEditMode) {
      resultAction = await dispatch(updateTemple({ templeId: formData.id, templeData: formDataToSend }));
    } else {
      resultAction = await dispatch(createTemple(formDataToSend));
    }
  
    if (resultAction.meta.requestStatus === "fulfilled") {
      dispatch(fetchTempleData(userId));
      setShowSuccessMessage(true);
      resetForm();
    }
  };
  

  const handleEdit = (temple) => {
    setFormData({
      name: temple.name,
      location: temple.location,
      description: temple.description,
      districtName: temple.districtName,
      photo: "",
      id: temple.id,
    });
    setIsEditMode(true);
    setTempleBeingEdited(temple);
  };

  const filteredTemples = temples.filter(
    (temple) => temple?.name?.toLowerCase().includes(searchQuery)
  );

  const currentTemples = filteredTemples.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(filteredTemples.length / usersPerPage);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        {isEditMode ? "Edit Temple" : "Add Temple"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto whitespace-nowrap">
          {/* {/ Text Fields /} */}
          {["name", "location", "description"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm sm:text-base font-medium capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="text-sm sm:text-base border p-2 w-full"
                required
              />
            </div>
          ))}

          {/* {/ District Dropdown /} */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium">District Name</label>
            <select
              name="districtName"
              value={formData.districtName}
              onChange={handleDistrictChange}
              className="w-full text-sm sm:text-base border p-2 rounded"
              required
            >
              <option value="">Select a District</option>
              {odishaDistricts.map((district) => (
                <option key={district.value} value={district.value}>
                  {district.label}
                </option>
              ))}
            </select>
          </div>

          {/* {/ Image Upload /} */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium">Upload Temple Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border text-sm sm:text-base p-2 w-full"
            />
            {/* {/ Existing Image /} */}
            {!formData.photo && isEditMode && templeBeingEdited?.imageBase64 && (
              <img
                src={`data:image/png;base64,${templeBeingEdited.imageBase64}`}
                alt="Existing"
                className="w-20 h-20 object-cover mt-2 rounded"
              />
            )}
            {/* {/ Preview New Upload /} */}
            {formData.photo instanceof File && (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Preview"
                className="w-20 h-20 object-cover mt-2 rounded"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-sm sm:text-base text-white px-6 py-2 rounded"
        >
          {isEditMode ? "Update Temple" : "Add Temple"}
        </button>
      </form>

      {/* {/ Search Input /} */}
      <input
        type="text"
        placeholder="Search temples..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border text-sm sm:text-base p-2 w-70 mb-4"
      />

      {/* {/ Table Display /} */}
      {loading ? (
        <p>Loading temples...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message || "Something went wrong."}</p>
      ) : (
        <>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="text-sm sm:text-base bg-gray-200">
                {["Name", "Location", "Description", "District", "Image", "Edit"].map((col) => (
                  <th key={col} className="border p-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTemples.length > 0 ? (
                currentTemples.map((temple) => (
                  <tr key={temple.templeId} className="text-center">
                    <td className="text-xs sm:text-base border p-2">{temple.name}</td>
                    <td className="text-xs sm:text-base border p-2">{temple.location}</td>
                    <td className="text-xs sm:text-base border p-2">{temple.description}</td>
                    <td className="text-xs sm:text-base border p-2">{temple.districtName}</td>
                    <td className="text-xs sm:text-base border p-2">
                      {temple.imageBase64 && (
                        <img
                          src={`data:image/png;base64,${temple.imageBase64}`}
                          alt="Temple"
                          className="w-20 h-20 object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      <button
                        onClick={() => handleEdit(temple)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No temples found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {/* {/ Pagination /} */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-gray-300 text-xs sm:text-base text-gray-700 px-3 py-1 rounded"
            >
              Previous
            </button>
            <span className="text-xs sm:text-base py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-gray-300 text-xs sm:text-base text-gray-700 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>

          {/* {/ Success Modal /} */}
          {showSuccessMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-lg font-semibold text-green-600">
                  Temple saved successfully!
                </p>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddTemple;
