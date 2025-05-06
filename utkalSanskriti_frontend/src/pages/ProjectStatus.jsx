import React from "react";
const ProjectStatus = ({ project }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Project Status Report</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2">Project Manager</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Overall Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{project?.id || "N/A"}</td>
            <td className="border px-4 py-2">{project?.name || "N/A"}</td>
            <td className="border px-4 py-2">{project?.manager || "N/A"}</td>
            <td className="border px-4 py-2">{project?.date || "N/A"}</td>
            <td className="border px-4 py-2">{project?.status || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectStatus;
