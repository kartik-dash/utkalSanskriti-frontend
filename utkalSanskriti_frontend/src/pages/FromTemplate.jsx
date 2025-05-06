import { useState } from "react";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    reportTitle: "",
    reportDate: "",
    reportType: "incident",
    authorName: "",
    department: "",
    details: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Report submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Report Management Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="reportTitle"
          placeholder="Report Title"
          value={formData.reportTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="date"
          name="reportDate"
          value={formData.reportDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <select
          name="reportType"
          value={formData.reportType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="incident">Incident Report</option>
          <option value="project">Project Report</option>
          <option value="financial">Financial Report</option>
          <option value="performance">Performance Report</option>
        </select>
        
        <input
          type="text"
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled selected>Department</option>
          <option value="Ui">Ui</option>
          <option value="Ux">Ux</option>
          <option value="Java">Java</option>
          <option value="devops">devops</option>
          <option value="education">Education</option>
        </select>
        
        <textarea
          name="details"
          placeholder="Report Details"
          value={formData.details}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
          required
        ></textarea>
        
        <input
          type="file"
          name="attachment"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
