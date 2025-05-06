import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Sample Data for Pie Chart and Recent Activity
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivities = [
  { type: 'User Login', timestamp: '2025-01-24 10:30 AM', user: 'John Doe' },
  { type: 'Data Update', timestamp: '2025-01-24 11:00 AM', user: 'Jane Smith' },
  { type: 'Error Report', timestamp: '2025-01-24 12:00 PM', user: 'Admin' },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      {/* Header Section - Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <span className="material-icons">account_circle</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-gray-500 text-sm">Active user count</p>
            </div>
          </div>
          <div className="text-2xl font-semibold">1,024</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-teal-500 p-2 rounded-full text-white">
              <span className="material-icons">notifications</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Active Users</h3>
              <p className="text-gray-500 text-sm">Users online now</p>
            </div>
          </div>
          <div className="text-2xl font-semibold">356</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-400 p-2 rounded-full text-white">
              <span className="material-icons">event_note</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">New Notifications</h3>
              <p className="text-gray-500 text-sm">Recent alerts</p>
            </div>
          </div>
          <div className="text-2xl font-semibold">5</div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-medium mb-4">User Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-medium mb-4">Daily Active Users</h3>
          {/* Placeholder for another chart */}
          <p className="text-lg">Bar Chart will be here</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 p-2 rounded-full text-white">
              <span className="material-icons">error</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Recent Activities</h3>
            </div>
          </div>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index} className="border-b py-2">
                <div className="font-medium">{activity.type} by {activity.user}</div>
                <div className="text-gray-500 text-sm">{activity.timestamp}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <span className="material-icons">notifications</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
          </div>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index} className="border-b py-2">
                <div className="font-medium">{activity.type}</div>
                <div className="text-gray-500 text-sm">{activity.timestamp}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
