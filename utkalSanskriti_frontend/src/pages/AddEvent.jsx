import React, { useState } from "react";
import { submitEvent } from "../redux/thunks/eventThunks";
import { useDispatch, useSelector } from "react-redux";

// Helper function to get current date/time in "YYYY-MM-DDTHH:MM" format
const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
    return localISOTime;
};

const AddEvent = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);

    const [formData, setFormData] = useState({
        eventName: "",
        startDate: "",
        endDate: "",
        description: "",
        location: "",
        eventImage: null,            // file object
        eventImagePreview: "",       // preview URL
        topLevelId: userId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagePath = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                eventImage: file,
                eventImagePreview: URL.createObjectURL(file), // preview only
            }));
        }
    };

   const handleSubmit = (e) => {
       e.preventDefault();
   
       if (new Date(formData.endDate) < new Date(formData.startDate)) {
           alert("End date cannot be earlier than start date.");
           return;
       }
   
       const form = new FormData();
       form.append("eventName", formData.eventName);
       form.append("startDate", formData.startDate);
       form.append("endDate", formData.endDate);
       form.append("description", formData.description);
       form.append("location", formData.location);
       form.append("topLevelId", formData.topLevelId);
   
       if (formData.eventImage) {
           form.append("eventImage", formData.eventImage); // actual File object
       }
   
       dispatch(submitEvent(form));
   
       // Reset form
       setFormData({
           eventName: "",
           startDate: "",
           endDate: "",
           description: "",
           location: "",
           eventImage: null,
           eventImagePreview: "",
           topLevelId: userId,
       });
   };

    return (
        <div className="m-6">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-2 mt-1"
                        placeholder="Enter Event Name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            // Prevent selecting past dates by setting min attribute to current date/time
                            min={getCurrentDateTimeLocal()}
                            className="w-full border rounded-xl px-4 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">End Date</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            // Set minimum value to startDate so end date cannot be earlier
                            min={formData.startDate || getCurrentDateTimeLocal()}
                            className="w-full border rounded-xl px-4 py-2 mt-1"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-2 mt-1"
                        placeholder="Enter Description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-2 mt-1"
                        placeholder="Enter Location"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700">Select Event Image File</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagePath}
                        className="w-full mt-2"
                    />
                    {formData.eventImagePreview && (
                        <div className="mt-2 text-sm text-gray-600">
                            Selected Preview:
                            <div className="mt-3">
                                <img
                                    src={formData.eventImagePreview}
                                    alt="Event"
                                    className="w-40 h-40 object-cover rounded-xl border shadow mt-2"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                    Submit Event
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddEvent;
