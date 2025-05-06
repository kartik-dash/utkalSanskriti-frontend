import { useState } from "react";
const AllProject= () => {
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projects, setProjects] = useState([]);

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        updateEndDate(e.target.value, duration);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
        updateEndDate(startDate, e.target.value);
    };

    const updateEndDate = (start, days) => {
        if (start && days) {
            const newEndDate = new Date(start);
            newEndDate.setDate(newEndDate.getDate() + parseInt(days, 10));
            setEndDate(newEndDate.toISOString().split("T")[0]);
        } else {
            setEndDate("");
        }
    };

    const handleSave = () => {
        if (!projectName || !startDate || !duration) {
            alert("Please fill out all fields before saving.");
            return;
        }

        const newProject = { projectName, startDate, duration, endDate };
        setProjects([...projects, newProject]);

        // Reset fields after saving
        setProjectName("");
        setStartDate("");
        setDuration("");
        setEndDate("");
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
             <div className="grid grid-cols-4 gap-4 all_project_button">
            <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                    className="mt-1 p-2 w-full border rounded-md"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    placeholder="Enter project name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                <input
                    className="mt-1 p-2 w-full border rounded-md"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={handleDurationChange}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    className="mt-1 p-2 w-full border rounded-md"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    className="mt-1 p-2 w-full border rounded-md bg-gray-200"
                    type="date"
                    value={endDate}
                    readOnly
                />
            </div>

            <button className="mt-4 p-2 bg-blue-500 w-32 text-white rounded-md hover:bg-blue-600" onClick={handleSave}>
    Save Project
</button>

            </div>

            <div className="mt-6">
                <h2 className="text-lg font-medium">Project List</h2>
                <table className="mt-2 bg-white w-full border-collapse border border-gray-300 rounded-md shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Project Name</th>
                            <th className="border border-gray-300 p-2">Start Date</th>
                            <th className="border border-gray-300 p-2">End Date</th>
                            <th className="border border-gray-300 p-2">Duration (Days)</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2">{project.projectName}</td>
                                <td className="border border-gray-300 p-2">{project.startDate}</td>
                                <td className="border border-gray-300 p-2">{project.endDate}</td>
                                <td className="border border-gray-300 p-2">{project.duration}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex space-x-2">
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit</button>
                                        <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">Assign</button>
                                        <button className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Status</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AllProject;
