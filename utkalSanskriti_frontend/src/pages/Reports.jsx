import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [reports, setReports] = useState([
    { title: 'Sales Report', date: '2025-01-23', status: 'Completed' },
    { title: 'User Activity Report', date: '2025-01-22', status: 'Pending' },
  ]);

  const handleFilterChange = (e) => {
    setReportType(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filter Reports */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filter Reports</h2>
          <div className="mb-4">
            <label htmlFor="reportType" className="block text-gray-700 font-medium">Report Type</label>
            <select
              id="reportType"
              value={reportType}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Report Type</option>
              <option value="Sales">Sales</option>
              <option value="User Activity">User Activity</option>
              <option value="Error Log">Error Log</option>
            </select>
          </div>
          <button
            onClick={() => console.log('Filtered Reports by:', reportType)}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filter
          </button>
        </div>

        {/* Report List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
                <p className="text-gray-600">{`${report.date} - ${report.status}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
